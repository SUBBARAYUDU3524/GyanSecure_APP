import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {Snackbar} from 'react-native-paper';

export default function MonoAlphabeticCipher() {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === 'dark';
  const placeholderColor = isDarkMode ? '#888888' : '#555555'; // Adjust placeholder color

  const dismissError = () => setVisible(false);

  const handleInputChange = (text, setter, isKey = false) => {
    if (isKey) {
      setter(text.toUpperCase());
    } else {
      setter(text.replace(/[^A-Za-z]/g, '')); // Allow only alphabets
    }
  };

  const generateAlphabet = () => {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  };

  const validateKey = key => {
    if (key.length !== 26) {
      setError('Key must be 26 characters long!');
      setVisible(true);
      return false;
    }

    const keySet = new Set(key);
    if (keySet.size !== 26) {
      setError('Key must contain all unique characters!');
      setVisible(true);
      return false;
    }

    return true;
  };

  const monoAlphabeticEncrypt = (text, key) => {
    if (!validateKey(key)) return '';
    const alphabet = generateAlphabet();
    const keyMap = {};

    alphabet.forEach((letter, index) => {
      keyMap[letter] = key[index];
    });

    return text
      .split('')
      .map(letter => keyMap[letter])
      .join('');
  };

  const monoAlphabeticDecrypt = (cipher, key) => {
    if (!validateKey(key)) return '';
    const alphabet = generateAlphabet();
    const reverseKeyMap = {};

    key.split('').forEach((letter, index) => {
      reverseKeyMap[letter] = alphabet[index];
    });

    return cipher
      .split('')
      .map(letter => reverseKeyMap[letter])
      .join('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MonoAlphabetic Cipher</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>MonoAlphabetic Cipher</Text>
        <Text style={styles.subheading}>Encryption Process:</Text>
        <Text style={styles.text}>
          1. <Text style={styles.bold}>Choose a key (26 unique letters):</Text>
          {'\n'}This is the substitution alphabet used for encryption.
        </Text>
        <Text style={styles.text}>
          2.{' '}
          <Text style={styles.bold}>
            Substitute each letter of the plaintext:
          </Text>
          {'\n'}Each letter in the plaintext is replaced by the corresponding
          letter in the key.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Decryption Process:</Text>
        <Text style={styles.text}>
          1. <Text style={styles.bold}>Reconstruct the original alphabet:</Text>
          {'\n'}Using the key, map each letter back to the original alphabet.
        </Text>
        <Text style={styles.text}>
          2.{' '}
          <Text style={styles.bold}>
            Substitute each letter of the ciphertext:
          </Text>
          {'\n'}Each letter in the ciphertext is replaced by the corresponding
          letter in the original alphabet.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Encryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter plaintext"
          placeholderTextColor={placeholderColor}
          value={plaintext}
          onChangeText={text => handleInputChange(text, setPlaintext)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter key (26 unique letters)"
          placeholderTextColor={placeholderColor}
          value={key}
          onChangeText={text => handleInputChange(text, setKey, true)}
        />
        <Button
          title="Encrypt"
          onPress={() => setCiphertext(monoAlphabeticEncrypt(plaintext, key))}
        />
        {ciphertext ? (
          <Text style={styles.result}>Ciphertext: {ciphertext}</Text>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Decryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ciphertext"
          placeholderTextColor={placeholderColor}
          value={ciphertext}
          onChangeText={text => handleInputChange(text, setCiphertext)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter key (26 unique letters)"
          placeholderTextColor={placeholderColor}
          value={key}
          onChangeText={text => handleInputChange(text, setKey, true)}
        />
        <Button
          title="Decrypt"
          onPress={() =>
            setDecryptedText(monoAlphabeticDecrypt(ciphertext, key))
          }
        />
        {decryptedText ? (
          <Text style={styles.result}>Decrypted Text: {decryptedText}</Text>
        ) : null}
      </View>

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
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    elevation: 5,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: '100%',
    fontSize: 16,
  },
  result: {
    marginTop: 15,
    fontSize: 18,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 6,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  code: {
    fontFamily: 'monospace',
    color: '#e83e8c',
  },
  codeBlock: {
    fontFamily: 'monospace',
    backgroundColor: '#f1f3f5',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    fontSize: 16,
  },
});
