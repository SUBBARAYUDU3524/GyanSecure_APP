import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Snackbar } from "react-native-paper"; // Import Snackbar for error handling

export default function MonoalphabeticCipher() {
  const [encryptionPlaintext, setEncryptionPlaintext] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [ciphertext, setCiphertext] = useState("");

  const [decryptionCiphertext, setDecryptionCiphertext] = useState("");
  const [decryptionKey, setDecryptionKey] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

 const colorScheme = useColorScheme(); // Detect light or dark mode
    const isDarkMode = colorScheme === 'dark';
  const placeholderColor = isDarkMode ? '#888888' : '#555555'; // Adjust placeholder color


  const [error, setError] = useState(""); // For error message
  const [visible, setVisible] = useState(false); // Snackbar visibility

  const encryptAnim = useSharedValue(-50);
  const decryptAnim = useSharedValue(50);

  const encryptStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(encryptAnim.value, { duration: 500 }) }],
    opacity: withTiming(encryptAnim.value === 0 ? 1 : 0, { duration: 500 }),
  }));

  const decryptStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(decryptAnim.value, { duration: 500 }) }],
    opacity: withTiming(decryptAnim.value === 0 ? 1 : 0, { duration: 500 }),
  }));

  React.useEffect(() => {
    encryptAnim.value = 0;
    decryptAnim.value = 0;
  }, []);

  const handleTextChange = (text, setter, isShift = false) => {
    // If it's a key input, allow only alphabets
    if (isShift) {
      const filteredText = text.replace(/[^A-Za-z]/g, ""); // Allow only letters
      setter(filteredText);
    } else {
      // For other text inputs (plaintext/ciphertext), allow alphabets
      const filteredText = text.replace(/[^A-Za-z]/g, "");
      setter(filteredText);
    }
  };

  const monoalphabeticEncrypt = (plaintext, key) => {
    if (!plaintext || !key) {
      setError("Both plaintext and key are required!");
      setVisible(true);
      return "";
    }

    if (key.length !== 26) {
      setError("Key must contain exactly 26 characters!");
      setVisible(true);
      return "";
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < plaintext.length; i++) {
      let char = plaintext[i].toUpperCase();
      if (alphabet.includes(char)) {
        const index = alphabet.indexOf(char);
        result += key[index];
      } else {
        result += plaintext[i]; // Non-alphabetic characters remain unchanged
      }
    }

    return result;
  };

  const monoalphabeticDecrypt = (ciphertext, key) => {
    if (!ciphertext || !key) {
      setError("Both ciphertext and key are required!");
      setVisible(true);
      return "";
    }

    if (key.length !== 26) {
      setError("Key must contain exactly 26 characters!");
      setVisible(true);
      return "";
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < ciphertext.length; i++) {
      let char = ciphertext[i].toUpperCase();
      if (alphabet.includes(char)) {
        const index = key.indexOf(char);
        result += alphabet[index];
      } else {
        result += ciphertext[i]; // Non-alphabetic characters remain unchanged
      }
    }

    return result;
  };

  const dismissError = () => setVisible(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Monoalphabetic Cipher</Text>

      {/* Encryption Algorithm Section */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Encryption Algorithm</Text>
        <Text style={styles.text}>1. <Text style={styles.bold}>Choose a Substitution Alphabet:</Text></Text>
        <Text style={styles.text}>
          Define a substitution alphabet, which is a permutation of the regular alphabet.
          {"\n"}Example:
        </Text>
        <Text style={styles.code}>
          Regular Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ{"\n"}
          Substitution Alphabet: DEABCUWVFYZXGTHSRIJQPKLONM
        </Text>

        <Text style={styles.text}>2. <Text style={styles.bold}>Map Each Plaintext Letter to the Substitution Alphabet:</Text></Text>
        <Text style={styles.text}>
          Replace each letter in the plaintext with the corresponding letter from the substitution alphabet based on its position in the regular alphabet.
        </Text>

        <Text style={styles.text}>3. <Text style={styles.bold}>Construct the Ciphertext:</Text></Text>
        <Text style={styles.text}>
          Combine the substituted letters to form the ciphertext.
        </Text>

        <Text style={styles.exampleHeading}>Example:</Text>
        <Text style={styles.exampleText}>
          Plaintext: HELLO{"\n"}
          Substitution Process:{"\n"}
          H → V{"\n"}
          E → C{"\n"}
          L → X{"\n"}
          L → X{"\n"}
          O → H{"\n"}
          Ciphertext: VCXXH
        </Text>
      </View>

      {/* Decryption Algorithm Section */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Decryption Algorithm</Text>
        <Text style={styles.text}>1. <Text style={styles.bold}>Reverse the Substitution Alphabet:</Text></Text>
        <Text style={styles.text}>
          Use the substitution alphabet in reverse to map the ciphertext back to the regular alphabet.
        </Text>

        <Text style={styles.text}>2. <Text style={styles.bold}>Map Each Ciphertext Letter to the Regular Alphabet:</Text></Text>
        <Text style={styles.text}>
          For each letter in the ciphertext, determine its position in the substitution alphabet and map it back to the corresponding regular alphabet letter.
        </Text>

        <Text style={styles.text}>3. <Text style={styles.bold}>Construct the Plaintext:</Text></Text>
        <Text style={styles.text}>
          Combine the mapped letters to recover the plaintext.
        </Text>

        <Text style={styles.exampleHeading}>Example:</Text>
        <Text style={styles.exampleText}>
          Ciphertext: VCXXH{"\n"}
          Reverse Substitution Process:{"\n"}
          V → H{"\n"}
          C → E{"\n"}
          X → L{"\n"}
          X → L{"\n"}
          H → O{"\n"}
          Plaintext: HELLO
        </Text>
      </View>
      <Animated.View style={[styles.card, encryptStyle]}>
        <Text style={styles.subtitle}>Encryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 26-character key"
          placeholderTextColor={placeholderColor}
          value={encryptionKey}
          onChangeText={(text) => handleTextChange(text, setEncryptionKey, true)} // Allow only alphabets
        />
        <TextInput
          style={styles.input}
          placeholder="Enter plaintext"
          placeholderTextColor={placeholderColor}
          value={encryptionPlaintext}
          onChangeText={(text) => handleTextChange(text, setEncryptionPlaintext)} // Allow alphabets only
        />
        <Button
          title="Encrypt"
          onPress={() =>
            setCiphertext(monoalphabeticEncrypt(encryptionPlaintext, encryptionKey))
          }
        />
        {ciphertext ? <Text style={styles.result}>Ciphertext: {ciphertext}</Text> : null}
      </Animated.View>

  

      <Animated.View style={[styles.card, decryptStyle]}>
        <Text style={styles.subtitle}>Decryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 26-character key"
          placeholderTextColor={placeholderColor}
          value={decryptionKey}
          onChangeText={(text) => handleTextChange(text, setDecryptionKey, true)} // Allow only alphabets
        />
        <TextInput
          style={styles.input}
          placeholder="Enter ciphertext"
          placeholderTextColor={placeholderColor}
          value={decryptionCiphertext}
          onChangeText={(text) => handleTextChange(text, setDecryptionCiphertext)} // Allow alphabets only
        />
        <Button
          title="Decrypt"
          onPress={() =>
            setDecryptedText(monoalphabeticDecrypt(decryptionCiphertext, decryptionKey))
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
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#3e3e3e",
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
    color: "#2e2e2e",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: "100%",
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  result: {
    marginTop: 15,
    fontSize: 18,
    color: "#333",
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subheading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#444',
    backgroundColor: '#eef2f3',
    padding: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  exampleHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  exampleText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
    lineHeight: 22,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
  },
});
