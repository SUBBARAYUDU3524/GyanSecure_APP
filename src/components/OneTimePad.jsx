import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, useColorScheme } from 'react-native';

const OneTimePad = () => {
  const [plaintext, setPlaintext] = useState('');
  const [keyword, setKeyword] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === 'dark';
const placeholderColor = isDarkMode ? '#888888' : '#555555'; // Adjust placeholder color


  // Helper function to convert characters to numeric values
  const charToNum = (char) => char.charCodeAt(0) - 'A'.charCodeAt(0);

  // Helper function to convert numeric values back to characters
  const numToChar = (num) => String.fromCharCode(num + 'A'.charCodeAt(0));

  // Encryption function
  const encrypt = () => {
    setErrorMessage('');
    if (plaintext.length !== keyword.length) {
      setErrorMessage('Error: Key and Plaintext must be of the same length!');
      return;
    }

    let cipher = '';
    for (let i = 0; i < plaintext.length; i++) {
      const pChar = plaintext[i].toUpperCase();
      const kChar = keyword[i].toUpperCase();

      if (!pChar.match(/[A-Z]/) || !kChar.match(/[A-Z]/)) {
        setErrorMessage('Error: Only uppercase alphabets are allowed!');
        return;
      }

      const pNum = charToNum(pChar);
      const kNum = charToNum(kChar);
      const cNum = (pNum + kNum) % 26;

      cipher += numToChar(cNum);
    }

    setCiphertext(cipher);
  };

  // Decryption function
  const decrypt = () => {
    setErrorMessage('');
    if (ciphertext.length !== keyword.length) {
      setErrorMessage('Error: Key and Ciphertext must be of the same length!');
      return;
    }

    let plain = '';
    for (let i = 0; i < ciphertext.length; i++) {
      const cChar = ciphertext[i].toUpperCase();
      const kChar = keyword[i].toUpperCase();

      if (!cChar.match(/[A-Z]/) || !kChar.match(/[A-Z]/)) {
        setErrorMessage('Error: Only uppercase alphabets are allowed!');
        return;
      }

      const cNum = charToNum(cChar);
      const kNum = charToNum(kChar);
      const pNum = (cNum - kNum + 26) % 26;

      plain += numToChar(pNum);
    }

    setDecryptedText(plain);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>One-Time Pad Encryption & Decryption</Text>

      {/* Instructions and table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step 1: Convert Plaintext and Keyword into Numeric Values</Text>
        <Text style={styles.paragraph}>
          Each letter of the alphabet is assigned a number based on its position, starting from 0 for 'A' to 25 for 'Z'. Here’s the mapping:
        </Text>
        <Text style={styles.tableTitle}>Plaintext ("ENIGMA"):</Text>
        <View style={styles.table}>
          <Text style={styles.tableText}>E = 4</Text>
          <Text style={styles.tableText}>N = 13</Text>
          <Text style={styles.tableText}>I = 8</Text>
          <Text style={styles.tableText}>G = 6</Text>
          <Text style={styles.tableText}>M = 12</Text>
          <Text style={styles.tableText}>A = 0</Text>
        </View>
        <Text style={styles.tableTitle}>Keyword ("KEYWOR"):</Text>
        <View style={styles.table}>
          <Text style={styles.tableText}>K = 10</Text>
          <Text style={styles.tableText}>E = 4</Text>
          <Text style={styles.tableText}>Y = 24</Text>
          <Text style={styles.tableText}>W = 22</Text>
          <Text style={styles.tableText}>O = 14</Text>
          <Text style={styles.tableText}>R = 17</Text>
        </View>
      </View>

      {/* Encryption steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step 2: Perform Encryption (XOR Operation)</Text>
        <Text style={styles.paragraph}>
          For encryption, the key is combined with the plaintext by performing the following formula:
        </Text>
        <Text style={styles.tableText}>Encrypted Character = (Plaintext Character + Key Character) mod 26</Text>
        <Text style={styles.paragraph}>
          Applying this to the values gives the following encrypted text:
        </Text>
        <Text style={styles.tableText}>E (4) + K (10) = 14 → 'O'</Text>
        <Text style={styles.tableText}>N (13) + E (4) = 17 → 'R'</Text>
        <Text style={styles.tableText}>I (8) + Y (24) = 32 → 32 mod 26 = 6 → 'G'</Text>
        <Text style={styles.tableText}>G (6) + W (22) = 28 → 28 mod 26 = 2 → 'C'</Text>
        <Text style={styles.tableText}>M (12) + O (14) = 26 → 26 mod 26 = 0 → 'A'</Text>
        <Text style={styles.tableText}>A (0) + R (17) = 17 → 'R'</Text>
        <Text style={styles.resultText}>Encrypted Text: "ORGCAR"</Text>
      </View>

      {/* Decryption steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step 3: Perform Decryption (XOR Operation)</Text>
        <Text style={styles.paragraph}>
          To decrypt, the process is reversed using the formula:
        </Text>
        <Text style={styles.tableText}>Decrypted Character = (Encrypted Character - Key Character) mod 26</Text>
        <Text style={styles.paragraph}>
          Applying this to the encrypted text "ORGCAR", we get:
        </Text>
        <Text style={styles.tableText}>O (14) - K (10) = 4 → 'E'</Text>
        <Text style={styles.tableText}>R (17) - E (4) = 13 → 'N'</Text>
        <Text style={styles.tableText}>G (6) - Y (24) = -18 → -18 mod 26 = 8 → 'I'</Text>
        <Text style={styles.tableText}>C (2) - W (22) = -20 → -20 mod 26 = 6 → 'G'</Text>
        <Text style={styles.tableText}>A (0) - O (14) = -14 → -14 mod 26 = 12 → 'M'</Text>
        <Text style={styles.tableText}>R (17) - R (17) = 0 → 'A'</Text>
        <Text style={styles.resultText}>Decrypted Text: "ENIGMA"</Text>
      </View>

      {/* Encryption Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Enter Plaintext:</Text>
        <TextInput
          style={styles.input}
          value={plaintext}
          onChangeText={setPlaintext}
          placeholder="Enter Plaintext"
          placeholderTextColor={placeholderColor}
          maxLength={6}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Enter Keyword:</Text>
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Enter Keyword"
          placeholderTextColor={placeholderColor}
          maxLength={6}
          autoCapitalize="characters"
        />

        <Button title="Encrypt" onPress={encrypt} color="#4CAF50" />

        {ciphertext ? (
          <Text style={styles.resultText}>Cipher Text is: {ciphertext}</Text>
        ) : null}
      </View>
   
      {/* Decryption Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Enter Ciphertext:</Text>
        <TextInput
          style={styles.input}
          value={ciphertext}
          onChangeText={setCiphertext}
          placeholder="Enter Ciphertext"
          placeholderTextColor={placeholderColor}
          maxLength={6}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Enter Keyword:</Text>
        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Enter Keyword"
          placeholderTextColor={placeholderColor}
          maxLength={6}
          autoCapitalize="characters"
        />

        <Button title="Decrypt" onPress={decrypt} color="#FF5722" />

        {decryptedText ? (
          <Text style={styles.resultText}>Plain Text is: {decryptedText}</Text>
        ) : null}
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    color: '#4A4A4A',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4CAF50',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    marginTop: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A4A4A',
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
  },
  table: {
    marginLeft: 20,
  },
  tableText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
});

export default OneTimePad;
