import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Snackbar } from "react-native-paper"; // Import Snackbar for error handling

export default function CaesarCipher() {
  const [encryptionPlaintext, setEncryptionPlaintext] = useState("");
  const [encryptionShift, setEncryptionShift] = useState("");
  const [ciphertext, setCiphertext] = useState("");

  const [decryptionCiphertext, setDecryptionCiphertext] = useState("");
  const [decryptionShift, setDecryptionShift] = useState("");
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
    // If it's a shift input, allow only numbers
    if (isShift) {
      const filteredText = text.replace(/[^0-9]/g, ""); // Allow only numbers
      setter(filteredText);
    } else {
      // For other text inputs (plaintext/ciphertext), allow alphabets
      const filteredText = text.replace(/[^A-Za-z]/gi, "");
      setter(filteredText);
    }
  };

  const caesarEncrypt = (plaintext, shift) => {
    if (!plaintext || shift === "") {
      setError("Both plaintext and shift value are required!");
      setVisible(true);
      return "";
    }

    const shiftValue = parseInt(shift);
    if (isNaN(shiftValue)) {
      setError("Shift value must be a number!");
      setVisible(true);
      return "";
    }

    const result = plaintext
      .split("")
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const code = char.charCodeAt(0);
          const base = char.toLowerCase() === char ? 97 : 65;
          return String.fromCharCode(((code - base + shiftValue) % 26) + base);
        }
        return char;
      })
      .join("");

    return result;
  };

  const caesarDecrypt = (ciphertext, shift) => {
    if (!ciphertext || shift === "") {
      setError("Both ciphertext and shift value are required!");
      setVisible(true);
      return "";
    }

    const shiftValue = parseInt(shift);
    if (isNaN(shiftValue)) {
      setError("Shift value must be a number!");
      setVisible(true);
      return "";
    }

    const result = ciphertext
      .split("")
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const code = char.charCodeAt(0);
          const base = char.toLowerCase() === char ? 97 : 65;
          return String.fromCharCode(((code - base - shiftValue + 26) % 26) + base);
        }
        return char;
      })
      .join("");

    return result;
  };

  const dismissError = () => setVisible(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Caesar Cipher</Text>
  <View>
    <Text  style={styles.mainheader}>
    Algoritm For the Encryption & Decryption
    </Text>
    <Text style={styles.header}>1. Encryption</Text>
      <Text style={styles.subHeader}>Input:</Text>
      <Text style={styles.bodyText}>Plaintext (e.g., "HELLO").</Text>
      <Text style={styles.bodyText}>Shift value 𝑘 (e.g., 3).</Text>
      
      <Text style={styles.subHeader}>Steps:</Text>
      <Text style={styles.bodyText}>For each letter in the plaintext:</Text>
      <Text style={styles.bulletPoint}>
        ● Determine the letter's position in the alphabet (A=0, B=1, ..., Z=25).
      </Text>
      <Text style={styles.bulletPoint}>
        ● Calculate the new position using the formula:
      </Text>
      <Text style={styles.formula}>
        NewPosition = (CurrentPosition + k) mod 26
      </Text>
      <Text style={styles.bulletPoint}>
        ● Replace the letter with the letter at the new position.
      </Text>
      <Text style={styles.bulletPoint}>
        ● Non-alphabetic characters remain unchanged.
      </Text>
      
      <Text style={styles.subHeader}>Output:</Text>
      <Text style={styles.bodyText}>
        The resulting ciphertext (e.g., "KHOOR").
      </Text>
      
      <Text style={styles.header}>2. Decryption</Text>
      <Text style={styles.subHeader}>Input:</Text>
      <Text style={styles.bodyText}>Ciphertext (e.g., "KHOOR").</Text>
      <Text style={styles.bodyText}>Shift value 𝑘 (e.g., 3).</Text>
      
      <Text style={styles.subHeader}>Steps:</Text>
      <Text style={styles.bodyText}>For each letter in the ciphertext:</Text>
      <Text style={styles.bulletPoint}>
        ● Determine the letter's position in the alphabet (A=0, B=1, ..., Z=25).
      </Text>
      <Text style={styles.bulletPoint}>
        ● Calculate the original position using the formula:
      </Text>
      <Text style={styles.formula}>
        OriginalPosition = (CurrentPosition − k + 26) mod 26
      </Text>
      <Text style={styles.bulletPoint}>
        ● Replace the letter with the letter at the original position.
      </Text>
      <Text style={styles.bulletPoint}>
        ● Non-alphabetic characters remain unchanged.
      </Text>
      
      <Text style={styles.subHeader}>Output:</Text>
      <Text style={styles.bodyText}>
        The resulting plaintext (e.g., "HELLO").
      </Text>
      
     
      
    </View>
      <Animated.View style={[styles.card, encryptStyle]}>
        <Text style={styles.subtitle}>Encryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter shift value (numbers only)"
          placeholderTextColor={placeholderColor}
          value={encryptionShift}
          onChangeText={(text) => handleTextChange(text, setEncryptionShift, true)} // Allow only numbers
          keyboardType="numeric" // Show numeric keyboard
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
            setCiphertext(caesarEncrypt(encryptionPlaintext, encryptionShift))
          }
        />
        {ciphertext ? <Text style={styles.result}>Ciphertext: {ciphertext}</Text> : null}
      </Animated.View>

 

      <Animated.View style={[styles.card, decryptStyle]}>
        <Text style={styles.subtitle}>Decryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter shift value (numbers only)"
          placeholderTextColor={placeholderColor}
          value={decryptionShift}
          onChangeText={(text) => handleTextChange(text, setDecryptionShift, true)} // Allow only numbers
          keyboardType="numeric" // Show numeric keyboard
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
            setDecryptedText(caesarDecrypt(decryptionCiphertext, decryptionShift))
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
    marginBottom: 10,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343A40",
    marginBottom: 8,
  },
  mainheader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343A40",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 16,
    color: "#212529",
    marginBottom: 24,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#495057",
    marginLeft: 16,
    marginBottom: 4,
  },
  formula: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#6C757D",
    marginLeft: 16,
    marginBottom: 4,
  },
  table: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
    width: "25%",
    padding: 4,
    backgroundColor: "#E9ECEF",
  },
  tableRow: {
    fontSize: 16,
    color: "#212529",
    width: "25%",
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#DEE2E6",
  },
});
