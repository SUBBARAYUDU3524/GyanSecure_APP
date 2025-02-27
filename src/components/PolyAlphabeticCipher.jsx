import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Snackbar } from "react-native-paper"; // Import Snackbar for error handling

export default function PolyalphabeticCipher() {
  const [plaintext, setPlaintext] = useState("");
  const [keyword, setKeyword] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const [error, setError] = useState(""); // For error message
  const [visible, setVisible] = useState(false); // Snackbar visibility

  const encryptAnim = useSharedValue(-50);
  const decryptAnim = useSharedValue(50);

  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === 'dark';
const placeholderColor = isDarkMode ? '#888888' : '#555555'; // Adjust placeholder color

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

  const handleTextChange = (text, setter) => {
    const filteredText = text.replace(/[^A-Za-z]/gi, ""); // Allow only alphabets
    setter(filteredText);
  };

  const polyalphabeticEncrypt = (plaintext, keyword) => {
    if (!plaintext || !keyword) {
      setError("Both plaintext and keyword are required!");
      setVisible(true);
      return "";
    }

    const repeatedKey = keyword.repeat(Math.ceil(plaintext.length / keyword.length)).slice(0, plaintext.length);

    const encryptedText = plaintext
      .split("")
      .map((char, index) => {
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const keyCode = repeatedKey[index].toUpperCase().charCodeAt(0) - 65;
        return String.fromCharCode(((charCode + keyCode) % 26) + 65);
      })
      .join("");

    return encryptedText;
  };

  const polyalphabeticDecrypt = (ciphertext, keyword) => {
    if (!ciphertext || !keyword) {
      setError("Both ciphertext and keyword are required!");
      setVisible(true);
      return "";
    }

    const repeatedKey = keyword.repeat(Math.ceil(ciphertext.length / keyword.length)).slice(0, ciphertext.length);

    const decryptedText = ciphertext
      .split("")
      .map((char, index) => {
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const keyCode = repeatedKey[index].toUpperCase().charCodeAt(0) - 65;
        return String.fromCharCode(((charCode - keyCode + 26) % 26) + 65);
      })
      .join("");

    return decryptedText;
  };

  const dismissError = () => setVisible(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Polyalphabetic Cipher</Text>

      <Text style={styles.header}>Encryption and Decryption Algorithm</Text>
      
      <View style={styles.section}>
        <Text style={styles.subHeader}>Encryption Algorithm</Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Prepare the keyword:</Text>
          {'\n'}Repeat or truncate the keyword to match the length of the plaintext.
        </Text>
        
        <Text style={styles.content}>
          <Text style={styles.bold}>Calculate the shift:</Text>
          {'\n'}Each letter in the keyword determines the shift. For example:
          {'\n'}'A' corresponds to a shift of 0 (no change).
          {'\n'}'B' corresponds to a shift of 1.
          {'\n'}'C' corresponds to a shift of 2, and so on.
        </Text>
        
        <Text style={styles.content}>
          <Text style={styles.bold}>Encrypt each letter:</Text>
          {'\n'}For each letter in the plaintext, find the corresponding letter in the keyword.
          {'\n'}Shift the plaintext letter forward in the alphabet by the value of the keyword letter.
          {'\n'}Note: If the plaintext contains non-alphabetic characters, they are usually left unchanged.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subHeader}>Decryption Algorithm</Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Prepare the keyword:</Text>
          {'\n'}Repeat or truncate the keyword to match the length of the ciphertext.
        </Text>
        
        <Text style={styles.content}>
          <Text style={styles.bold}>Reverse the shift:</Text>
          {'\n'}For each letter in the ciphertext, find the corresponding letter in the keyword.
          {'\n'}Shift the ciphertext letter backward in the alphabet by the value of the keyword letter.
        </Text>
      </View>
      
      <View style={styles.exampleSection}>
        <Text style={styles.exampleHeader}>Example</Text>
        <Text style={styles.exampleTitle}>Encryption</Text>
        <Text style={styles.exampleContent}>Keyword: <Text style={styles.code}>KEY</Text></Text>
        <Text style={styles.exampleContent}>Plaintext: <Text style={styles.code}>HELLO</Text></Text>
        
        <Text style={styles.exampleSubheader}>Prepare the keyword:</Text>
        <Text style={styles.exampleContent}>Repeat the keyword to match the plaintext length: <Text style={styles.code}>KEYKEY</Text></Text>
        
        <Text style={styles.exampleSubheader}>Calculate shifts:</Text>
        <Text style={styles.exampleContent}>K = 10, E = 4, Y = 24</Text>
        
        <Text style={styles.exampleSubheader}>Encrypt each letter:</Text>
        <Text style={styles.exampleContent}>H (shift by 10): R</Text>
        <Text style={styles.exampleContent}>E (shift by 4): I</Text>
        <Text style={styles.exampleContent}>L (shift by 24): J</Text>
        <Text style={styles.exampleContent}>L (shift by 10): V</Text>
        <Text style={styles.exampleContent}>O (shift by 4): S</Text>
        <Text style={styles.exampleContent}>Ciphertext: <Text style={styles.code}>RIJVS</Text></Text>
        
        <Text style={styles.exampleTitle}>Decryption</Text>
        <Text style={styles.exampleContent}>Keyword: <Text style={styles.code}>KEY</Text></Text>
        <Text style={styles.exampleContent}>Ciphertext: <Text style={styles.code}>RIJVS</Text></Text>
        
        <Text style={styles.exampleSubheader}>Prepare the keyword:</Text>
        <Text style={styles.exampleContent}>Repeat the keyword to match the ciphertext length: <Text style={styles.code}>KEYKEY</Text></Text>
        
        <Text style={styles.exampleSubheader}>Reverse the shifts:</Text>
        <Text style={styles.exampleContent}>R (reverse shift by 10): H</Text>
        <Text style={styles.exampleContent}>I (reverse shift by 4): E</Text>
        <Text style={styles.exampleContent}>J (reverse shift by 24): L</Text>
        <Text style={styles.exampleContent}>V (reverse shift by 10): L</Text>
        <Text style={styles.exampleContent}>S (reverse shift by 4): O</Text>
        <Text style={styles.exampleContent}>Plaintext: <Text style={styles.code}>HELLO</Text></Text>
      </View>

      <Animated.View style={[styles.card, encryptStyle]}>
        <Text style={styles.subtitle}>Encryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter plaintext"
          placeholderTextColor={placeholderColor}
          value={plaintext}
          onChangeText={(text) => handleTextChange(text, setPlaintext)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter keyword"
          placeholderTextColor={placeholderColor}
          value={keyword}
          onChangeText={(text) => handleTextChange(text, setKeyword)}
        />
        <Button
          title="Encrypt"
          onPress={() => setCiphertext(polyalphabeticEncrypt(plaintext, keyword))}
        />
        {ciphertext ? <Text style={styles.result}>Ciphertext: {ciphertext}</Text> : null}
      </Animated.View>

  

      <Animated.View style={[styles.card, decryptStyle]}>
        <Text style={styles.subtitle}>Decryption</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ciphertext"
          placeholderTextColor={placeholderColor}
          value={ciphertext}
          onChangeText={(text) => handleTextChange(text, setCiphertext)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter keyword"
          placeholderTextColor={placeholderColor}
          value={keyword}
          onChangeText={(text) => handleTextChange(text, setKeyword)}
        />
        <Button
          title="Decrypt"
          onPress={() => setDecryptedText(polyalphabeticDecrypt(ciphertext, keyword))}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
  exampleSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    marginBottom:20

  },
  exampleHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginVertical: 5,
  },
  exampleSubheader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginVertical: 5,
  },
  exampleContent: {
    fontSize: 16,
    color: '#555',

  },
  code: {
    fontFamily: 'Courier New',
    color: '#007acc',
    marginBottom:20
  },
});
