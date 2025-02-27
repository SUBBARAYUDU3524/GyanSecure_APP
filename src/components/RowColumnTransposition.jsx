import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { Snackbar } from "react-native-paper";

export default function RowColumnTransposition() {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === 'dark';
const placeholderColor = isDarkMode ? '#888888' : '#555555'; // Adjust placeholder color


  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const dismissError = () => setVisible(false);

  const handleInputChange = (text, setter, isKey = false) => {
    if (isKey) {
      setter(text.replace(/[^0-9]/g, "")); // Allow only numbers
    } else {
      setter(text.replace(/[^A-Za-z]/g, "").toUpperCase()); // Allow only alphabets
    }
  };

  const rowColumnEncrypt = (text, key) => {
    if (!text || !key) {
      setError("Both plaintext and key are required!");
      setVisible(true);
      return "";
    }

    const keyArray = key.split("").map(Number);
    const numCols = keyArray.length;
    const numRows = Math.ceil(text.length / numCols);

    // Fill the grid row by row
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(""));
    let index = 0;
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        grid[i][j] = text[index] || "X"; // Pad with 'X' if necessary
        index++;
      }
    }

    // Generate ciphertext by reading columns based on key
    const sortedKey = [...keyArray].sort((a, b) => a - b);
    let result = "";
    for (const col of sortedKey) {
      const colIndex = keyArray.indexOf(col);
      for (let row = 0; row < numRows; row++) {
        result += grid[row][colIndex];
      }
    }

    return result;
  };

  const rowColumnDecrypt = (cipher, key) => {
    if (!cipher || !key) {
      setError("Both ciphertext and key are required!");
      setVisible(true);
      return "";
    }

    const keyArray = key.split("").map(Number);
    const numCols = keyArray.length;
    const numRows = Math.ceil(cipher.length / numCols);

    // Fill the grid column by column based on the key
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(""));
    const sortedKey = [...keyArray].sort((a, b) => a - b);
    let index = 0;

    for (const col of sortedKey) {
      const colIndex = keyArray.indexOf(col);
      for (let row = 0; row < numRows; row++) {
        grid[row][colIndex] = cipher[index];
        index++;
      }
    }

    // Generate plaintext by reading rows
    let result = "";
    for (let row = 0; row < numRows; row++) {
      result += grid[row].join("");
    }

    return result.replace(/X+$/, ""); // Remove padding
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Row-Column Transposition Cipher</Text>

      <Text style={styles.subHeading}>Algorithm</Text>
        <Text style={styles.sectionHeading}>Encryption:</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Determine the key:</Text> The key is a permutation of column indices (e.g., 3 1 4 2),
          which determines the order in which the columns will be read to form the ciphertext.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Write the plaintext in rows:</Text> Arrange the plaintext into a grid of rows and
          columns based on the length of the key. Add padding (if necessary) to fill empty spaces.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Read the columns in the key order:</Text> Generate the ciphertext by reading the
          columns in the order specified by the key.
        </Text>

        <Text style={styles.sectionHeading}>Decryption:</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Recreate the grid:</Text> Create a grid with the same number of columns as the key
          and fill it column by column in the order of the key.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Read row by row:</Text> Recover the plaintext by reading the rows sequentially.
        </Text>

        <Text style={styles.subHeading}>Example</Text>
        <Text style={styles.sectionHeading}>Encryption</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Plaintext:</Text> MEETMEATTHEPARK
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Key:</Text> 3 1 4 2
        </Text>
        <Text style={styles.text}>Create a grid:</Text>
        <View style={styles.codeBlock}>
          <Text>M  E  E  T</Text>
          <Text>M  E  A  T</Text>
          <Text>T  H  E  P</Text>
          <Text>A  R  K  X</Text>
        </View>

        <Text style={styles.text}>Read columns in the key order:</Text>
        <View style={styles.text}>
          <Text>Column 3: E A E K</Text>
          <Text>Column 1: M M T A</Text>
          <Text>Column 4: T T P X</Text>
          <Text>Column 2: E E H R</Text>
        </View>
        <Text style={styles.text}>
          <Text style={styles.bold}>Ciphertext:</Text>EEHRTTPXMMTAEAEK
        </Text>

        <Text style={styles.sectionHeading}>Decryption</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Ciphertext:</Text>EEHRTTPXMMTAEAEK
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Key:</Text> 3 1 4 2
        </Text>
        <Text style={styles.text}>Recreate the grid:</Text>
        <View style={styles.codeBlock}>
          <Text>Column 3: E  A  E  K</Text>
          <Text>Column 1: M  M  T  A</Text>
          <Text>Column 4: T  T  P  X</Text>
          <Text>Column 2: E  E  H  R</Text>
        </View>
        <Text style={styles.text}>Rearrange columns to form the original grid:</Text>
        <View style={styles.codeBlock}>
          <Text>M  E  E  T</Text>
          <Text>M  E  A  T</Text>
          <Text>T  H  E  P</Text>
          <Text>A  R  K  X</Text>
        </View>
        <Text style={styles.text}>
          <Text style={styles.bold}>Plaintext:</Text> MEETMEATTHEPARK
        </Text>

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
          onPress={() => setCiphertext(rowColumnEncrypt(plaintext, key))}
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
          onPress={() => setDecryptedText(rowColumnDecrypt(ciphertext, key))}
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#555",
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  codeBlock: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    fontFamily: "monospace",
  },
});
