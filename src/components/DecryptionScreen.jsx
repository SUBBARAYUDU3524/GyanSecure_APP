import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Snackbar} from 'react-native-paper'; // Import Snackbar for error handling

export default function PlayfairCipher() {
  const [encryptionPlaintext, setEncryptionPlaintext] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  const [decryptionCiphertext, setDecryptionCiphertext] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === 'dark';

  const [error, setError] = useState(''); // For error message
  const [visible, setVisible] = useState(false); // Snackbar visibility

  const encryptAnim = useSharedValue(-50);
  const decryptAnim = useSharedValue(50);

  const encryptStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(encryptAnim.value, {duration: 500})}],
    opacity: withTiming(encryptAnim.value === 0 ? 1 : 0, {duration: 500}),
  }));

  const placeholderColor = isDarkMode ? '#888888' : '#555555'; // Adjust placeholder color

  const decryptStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(decryptAnim.value, {duration: 500})}],
    opacity: withTiming(decryptAnim.value === 0 ? 1 : 0, {duration: 500}),
  }));

  useEffect(() => {
    encryptAnim.value = 0;
    decryptAnim.value = 0;
  }, []);

  const createMatrix = key => {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    key = key.toUpperCase().replace(/J/g, 'I');
    const matrix = [];
    const used = new Set();

    for (const char of key + alphabet) {
      if (!used.has(char)) {
        used.add(char);
        matrix.push(char);
        if (matrix.length === 25) break;
      }
    }

    const grid = [];
    for (let i = 0; i < 25; i += 5) {
      grid.push(matrix.slice(i, i + 5));
    }
    return grid;
  };

  const preprocessText = (text, addPadding = true) => {
    text = text.toUpperCase().replace(/J/g, 'I').replace(/\s+/g, '');
    const processed = [];

    for (let i = 0; i < text.length; i++) {
      if (i + 1 < text.length && text[i] === text[i + 1]) {
        processed.push(text[i] + 'X');
      } else if (i + 1 < text.length) {
        processed.push(text[i] + text[i + 1]);
        i++;
      } else if (addPadding) {
        processed.push(text[i] + 'X');
      } else {
        processed.push(text[i]);
      }
    }

    return processed;
  };

  const findPosition = (matrix, char) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === char) return {row, col};
      }
    }
    return null;
  };

  const encryptPair = (pair, matrix) => {
    const pos1 = findPosition(matrix, pair[0]);
    const pos2 = findPosition(matrix, pair[1]);

    if (!pos1 || !pos2) {
      setError(
        `Character '${pair[0]}' or '${pair[1]}' not found in the matrix.`,
      );
      setVisible(true);
      return '';
    }

    const {row: r1, col: c1} = pos1;
    const {row: r2, col: c2} = pos2;

    if (r1 === r2) {
      return matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
    } else if (c1 === c2) {
      return matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
    } else {
      return matrix[r1][c2] + matrix[r2][c1];
    }
  };

  const decryptPair = (pair, matrix) => {
    const pos1 = findPosition(matrix, pair[0]);
    const pos2 = findPosition(matrix, pair[1]);

    if (!pos1 || !pos2) {
      setError(
        `Character '${pair[0]}' or '${pair[1]}' not found in the matrix.`,
      );
      setVisible(true);
      return '';
    }

    const {row: r1, col: c1} = pos1;
    const {row: r2, col: c2} = pos2;

    if (r1 === r2) {
      return matrix[r1][(c1 + 4) % 5] + matrix[r2][(c2 + 4) % 5];
    } else if (c1 === c2) {
      return matrix[(r1 + 4) % 5][c1] + matrix[(r2 + 4) % 5][c2];
    } else {
      return matrix[r1][c2] + matrix[r2][c1];
    }
  };

  const playfairEncrypt = (plaintext, key) => {
    if (!plaintext || !key) {
      setError('Both plaintext and key are required!');
      setVisible(true);
      return '';
    }
    const matrix = createMatrix(key);
    const pairs = preprocessText(plaintext, true);
    return pairs.map(pair => encryptPair(pair, matrix)).join('');
  };

  const playfairDecrypt = (ciphertext, key) => {
    if (!ciphertext || !key) {
      setError('Both ciphertext and key are required!');
      setVisible(true);
      return '';
    }
    const matrix = createMatrix(key);
    const pairs = preprocessText(ciphertext, false);
    let decrypted = pairs.map(pair => decryptPair(pair, matrix)).join('');

    decrypted = decrypted.replace(/([A-Z])X(?=[A-Z])/g, '$1');
    if (decrypted.endsWith('X')) {
      decrypted = decrypted.slice(0, -1);
    }

    return decrypted;
  };

  const dismissError = () => setVisible(false);

  // Function to restrict input to alphabets only
  const handleTextChange = (text, setter) => {
    // Remove any non-alphabetic characters
    const filteredText = text.replace(/[^A-Z]/gi, '');
    setter(filteredText);
  };

  const handleEncrypt = () => {
    const result = playfairEncrypt(encryptionPlaintext, encryptionKey);
    setCiphertext(result);
    setDecryptionKey(encryptionKey);
    setDecryptionCiphertext(result);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Playfair Cipher</Text>

      <Text style={styles.title}>Encryption Algorithm</Text>
      <Text style={styles.sectionTitle}>Step 1: Construct the 5x5 Matrix</Text>
      <Text style={styles.text}>
        Start with the keyword. Remove duplicate letters and omit 'J'. Add the
        rest of the alphabet in order, excluding letters already in the matrix.
      </Text>
      <Text style={styles.exampleTitle}>Example Keyword: MONARCHY</Text>
      <Text style={styles.exampleMatrix}>
        M O N A R{'\n'}C H Y B D{'\n'}E F G I K{'\n'}L P Q S T{'\n'}U V W X Z
      </Text>
      <Text style={styles.sectionTitle}>Step 2: Prepare the Plaintext</Text>
      <Text style={styles.text}>
        Divide the plaintext into pairs of letters (digraphs). If a pair
        consists of the same letter (e.g., LL), insert an 'X' between them. If
        the plaintext has an odd number of letters, append an 'X' to the end.
      </Text>
      <Text style={styles.exampleTitle}>Example Plaintext: INDIA</Text>
      <Text style={styles.text}>Digraphs: IN, DI, AX</Text>
      <Text style={styles.sectionTitle}>Step 3: Encrypt Each Digraph</Text>
      <Text style={styles.text}>
        Find both letters of the digraph in the matrix. Apply the following
        rules:
        {'\n'}1. Same Row: Replace each letter with the one to its right (wrap
        around to the start if needed).
        {'\n'}2. Same Column: Replace each letter with the one below it (wrap
        around to the top if needed).
        {'\n'}3. Rectangle: Form a rectangle; replace each letter with the one
        in its row but in the column of the other letter.
      </Text>
      <Text style={styles.exampleTitle}>Example:</Text>
      <Text style={styles.text}>
        Digraph IN: I is at (3, 4) and N is at (1, 3).{'\n'}
        Rectangle rule: Replace I with G and N with K.{'\n'}
        Result: GK.{'\n'}
        {'\n'}
        Digraph DI: D is at (2, 5) and I is at (3, 4).{'\n'}
        Rectangle rule: Replace D with K and I with B.{'\n'}
        Result: KB.{'\n'}
        {'\n'}
        Digraph AX: A is at (1, 4) and X is at (5, 4).{'\n'}
        Same column: Replace A with I and X with A.{'\n'}
        Result: IA.{'\n'}
        {'\n'}
        Ciphertext: GK KB IA
      </Text>

      <Text style={styles.title}>Decryption Algorithm</Text>
      <Text style={styles.text}>
        Use the same 5x5 matrix as for encryption. For each encrypted digraph,
        reverse the encryption rules:
        {'\n'}1. Same Row: Replace each letter with the one to its left (wrap
        around to the end if needed).
        {'\n'}2. Same Column: Replace each letter with the one above it (wrap
        around to the bottom if needed).
        {'\n'}3. Rectangle: Form a rectangle; replace each letter with the one
        in its row but in the column of the other letter.
      </Text>
      <Text style={styles.exampleTitle}>Example Ciphertext: GK KB IA</Text>
      <Text style={styles.text}>
        Digraph GK: G is at (3, 3) and K is at (3, 5).{'\n'}
        Rectangle rule: Replace G with I and K with N.{'\n'}
        Result: IN.{'\n'}
        {'\n'}
        Digraph KB: K is at (3, 5) and B is at (2, 4).{'\n'}
        Rectangle rule: Replace K with D and B with I.{'\n'}
        Result: DI.{'\n'}
        {'\n'}
        Digraph IA: I is at (3, 4) and A is at (1, 4).{'\n'}
        Same column: Replace I with A and A with X.{'\n'}
        Result: AX.{'\n'}
        {'\n'}
        Plaintext: INDIA
      </Text>

      <Animated.View style={[styles.card, encryptStyle]}>
        <Text style={styles.subtitle}>Encryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter key"
          placeholderTextColor={placeholderColor}
          value={encryptionKey}
          onChangeText={text => handleTextChange(text, setEncryptionKey)} // Only allow alphabets
        />
        <TextInput
          style={styles.input}
          placeholder="Enter plaintext"
          placeholderTextColor={placeholderColor}
          value={encryptionPlaintext}
          onChangeText={text => handleTextChange(text, setEncryptionPlaintext)} // Only allow alphabets
        />
        <Button title="Encrypt" onPress={handleEncrypt} />
        {ciphertext ? (
          <Text style={styles.result}>Ciphertext: {ciphertext}</Text>
        ) : null}
      </Animated.View>

      <Animated.View style={[styles.card, decryptStyle]}>
        <Text style={styles.subtitle}>Decryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter key"
          placeholderTextColor={placeholderColor}
          value={decryptionKey}
          onChangeText={text => handleTextChange(text, setDecryptionKey)} // Only allow alphabets
        />
        <TextInput
          style={styles.input}
          placeholder="Enter ciphertext"
          placeholderTextColor={placeholderColor}
          value={decryptionCiphertext}
          onChangeText={text => handleTextChange(text, setDecryptionCiphertext)} // Only allow alphabets
        />
        <Button
          title="Decrypt"
          onPress={() =>
            setDecryptedText(
              playfairDecrypt(decryptionCiphertext, decryptionKey),
            )
          }
        />
        {decryptedText ? (
          <Text style={styles.result}>Decrypted Text: {decryptedText}</Text>
        ) : null}
      </Animated.View>

      <Snackbar
        visible={visible}
        onDismiss={dismissError}
        duration={3000}
        action={{
          label: 'Close',
          onPress: dismissError,
        }}>
        {error}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#3e3e3e',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    elevation: 5,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2e2e2e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: '100%',
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  result: {
    marginTop: 15,
    fontSize: 18,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495E',
    marginBottom: 10,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16A085',
    marginBottom: 5,
  },
  exampleMatrix: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E44AD',
    lineHeight: 30,
    marginBottom: 20,
    fontFamily: 'Courier',
  },
});
