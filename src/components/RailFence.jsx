import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { Snackbar } from "react-native-paper";

export default function RailFenceCipher() {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === 'dark';
const placeholderColor = isDarkMode ? '#888888' : '#555555'; // Adjust placeholder color


  const dismissError = () => setVisible(false);

  const handleInputChange = (text, setter, isKey = false) => {
    if (isKey) {
      const filteredText = text.replace(/[^0-9]/g, ""); // Allow only numbers
      setter(filteredText);
    } else {
      setter(text.replace(/[^A-Za-z]/g, "").toUpperCase()); // Allow only alphabets
    }
  };

  const railFenceEncrypt = (text, rails) => {
    if (!text || !rails) {
      setError("Both plaintext and key are required!");
      setVisible(true);
      return "";
    }

    const key = parseInt(rails);
    if (isNaN(key) || key <= 1) {
      setError("Key must be a number greater than 1!");
      setVisible(true);
      return "";
    }

    const rail = Array.from({ length: key }, () => []);
    let direction = false; // false = down, true = up
    let row = 0;

    for (const char of text) {
      rail[row].push(char);
      if (row === 0 || row === key - 1) direction = !direction;
      row += direction ? 1 : -1;
    }

    return rail.flat().join("");
  };

  const railFenceDecrypt = (cipher, rails) => {
    if (!cipher || !rails) {
      setError("Both ciphertext and key are required!");
      setVisible(true);
      return "";
    }

    const key = parseInt(rails);
    if (isNaN(key) || key <= 1) {
      setError("Key must be a number greater than 1!");
      setVisible(true);
      return "";
    }

    const rail = Array.from({ length: key }, () => []);
    const len = cipher.length;
    let direction = false;
    let row = 0;

    // Mark the zigzag pattern
    const zigzag = Array(len).fill(0);
    for (let i = 0; i < len; i++) {
      zigzag[i] = row;
      if (row === 0 || row === key - 1) direction = !direction;
      row += direction ? 1 : -1;
    }

    // Fill the rail with ciphertext characters
    let index = 0;
    for (let r = 0; r < key; r++) {
      for (let i = 0; i < len; i++) {
        if (zigzag[i] === r) {
          rail[r].push(cipher[index++]);
        }
      }
    }

    // Read the plaintext in zigzag order
    direction = false;
    row = 0;
    let result = "";
    for (let i = 0; i < len; i++) {
      result += rail[row].shift();
      if (row === 0 || row === key - 1) direction = !direction;
      row += direction ? 1 : -1;
    }

    return result;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rail Fence Cipher</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Rail Fence Cipher</Text>
        <Text style={styles.subheading}>Encryption Process:</Text>
        <Text style={styles.text}>
          1. <Text style={styles.bold}>Choose the number of rails (n):</Text>
          {"\n"}This is the number of rows across which the plaintext will be written in a zigzag pattern.
        </Text>
        <Text style={styles.text}>
          2. <Text style={styles.bold}>Write the plaintext in a zigzag pattern:</Text>
          {"\n"}The plaintext is written diagonally down and up in a zigzag manner across the rails.
        </Text>
        <Text style={styles.text}>
          3. <Text style={styles.bold}>Read the rows sequentially:</Text>
          {"\n"}After filling the rails in the zigzag pattern, the ciphertext is formed by reading the content of each rail row by row.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Decryption Process:</Text>
        <Text style={styles.text}>
          1. <Text style={styles.bold}>Reconstruct the zigzag pattern:</Text>
          {"\n"}To decrypt, the number of rails must be known. The zigzag pattern of the ciphertext is reconstructed using the number of rails.
        </Text>
        <Text style={styles.text}>
          2. <Text style={styles.bold}>Extract the plaintext:</Text>
          {"\n"}The original plaintext is then recovered by reading the characters in the zigzag pattern.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Example of Rail Fence Cipher</Text>
        <Text style={styles.text}>
          Plaintext: <Text style={styles.code}>ATTACKATDAWN</Text>
          {"\n"}Rails: <Text style={styles.code}>3</Text>
        </Text>

        <Text style={styles.subheading}>Step-by-Step Encryption:</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Write the plaintext in a zigzag pattern:</Text>
          {"\n"}First, we arrange the plaintext across 3 rails in a zigzag pattern:
        </Text>
        <Text style={styles.codeBlock}>
          Rail 1: A . . . C . . . D {'\n'}
          Rail 2: . T....A ... K . T .. A . N {'\n'}
          Rail 3: . . T. .  A . . . W . . . .
        </Text>

        <Text style={styles.text}>
          The zigzag pattern looks like this:
        </Text>
        <Text style={styles.codeBlock}>
          Rail 1: A   C    D {'\n'}
          Rail 2:   T   A   K   T   A  N {'\n'}
          Rail 3:     T   A   W
        </Text>

        <Text style={styles.subheading}>Read the rows sequentially to form the ciphertext:</Text>
        <Text style={styles.text}>
          Rail 1: <Text style={styles.code}>ACD</Text>{"\n"}
          Rail 2: <Text style={styles.code}>T</Text>{"\n"}
          Rail 3: <Text style={styles.code}>AN</Text>{"\n"}
          Ciphertext: <Text style={styles.code}>ATACTWAKTDAN</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Example of Decryption</Text>
        <Text style={styles.text}>
          Ciphertext: <Text style={styles.code}>ATACTWAKTDAN</Text>{"\n"}
          Rails: <Text style={styles.code}>3</Text>
        </Text>

        <Text style={styles.subheading}>Reconstruct the zigzag pattern:</Text>
        <Text style={styles.text}>
          We start by creating a 3-rail grid, as per the number of rails. The ciphertext is placed in the zigzag pattern:
        </Text>
        <Text style={styles.codeBlock}>
          Rail 1: A . . . A . . . T . . . A . .{'\n'}
          Rail 2: . T . C . K . T . D . A . W .{'\n'}
          Rail 3: . . . A . . . N . . . . . .
        </Text>

        <Text style={styles.text}>Fill the grid with the ciphertext:</Text>
        <Text style={styles.codeBlock}>
          Rail 1: A   A   T   A{'\n'}
          Rail 2:   T   C   K   T   D   A   W{'\n'}
          Rail 3:     A   N
        </Text>

        <Text style={styles.subheading}>Read the grid row by row to get the original plaintext:</Text>
        <Text style={styles.text}>
          Plaintext: <Text style={styles.code}>ATTACKATDAWN</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Encryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter plaintext"
          placeholderTextColor={placeholderColor}
          value={plaintext}
          onChangeText={(text) => handleInputChange(text, setPlaintext)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter key (numbers only)"
          placeholderTextColor={placeholderColor}
          value={key}
          onChangeText={(text) => handleInputChange(text, setKey, true)}
          keyboardType="numeric"
        />
        <Button
          title="Encrypt"
          onPress={() => setCiphertext(railFenceEncrypt(plaintext, key))}
        />
        {ciphertext ? <Text style={styles.result}>Ciphertext: {ciphertext}</Text> : null}
      </View>



      <View style={styles.card}>
        <Text style={styles.subtitle}>Decryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ciphertext"
          placeholderTextColor={placeholderColor}
          value={ciphertext}
          onChangeText={(text) => handleInputChange(text, setCiphertext)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter key (numbers only)"
          placeholderTextColor={placeholderColor}
          value={key}
          onChangeText={(text) => handleInputChange(text, setKey, true)}
          keyboardType="numeric"
        />
        <Button
          title="Decrypt"
          onPress={() => setDecryptedText(railFenceDecrypt(ciphertext, key))}
        />
        {decryptedText ? <Text style={styles.result}>Decrypted Text: {decryptedText}</Text> : null}
      </View>

      <Snackbar
        visible={visible}
        onDismiss={dismissError}
        duration={3000}
        action={{
          label: "Close",
          onPress: dismissError,
        }}
      >
        {error}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    elevation: 5,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: "100%",
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
