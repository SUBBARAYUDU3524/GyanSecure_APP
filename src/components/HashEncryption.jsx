// Content.jsx
import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const HashEncryption = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hash Functions – Detailed Explanation</Text>

      <Text style={styles.subheader}>Introduction to Hash Functions</Text>
      <Text style={styles.text}>
        Hash functions are cryptographic algorithms designed to transform any input data into a fixed-size hash value or digest. These functions are deterministic, meaning the same input always produces the same hash. They are widely used for data integrity, password storage, and digital signatures.
      </Text>

      <Text style={styles.subheader}>Core Characteristics of Hash Functions</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Deterministic:</Text> The same input will always produce the same output.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Fixed Output Size:</Text> Regardless of input size, the output (hash) is always of a fixed size.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Fast Computation:</Text> Hash functions are computationally efficient.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Pre-Image Resistance:</Text> It is computationally infeasible to reverse-engineer the input from the hash.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Collision Resistance:</Text> Two different inputs should not produce the same hash value.
      </Text>

      <Text style={styles.subheader}>Common Cryptographic Hash Functions</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>MD5 (Message Digest Algorithm 5):</Text> Produces a 128-bit hash. It is fast but no longer considered secure due to vulnerabilities.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>SHA-1 (Secure Hash Algorithm 1):</Text> Produces a 160-bit hash. It has been deprecated due to collision attacks.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>SHA-2 (Secure Hash Algorithm 2):</Text> Produces 256-bit or 512-bit hashes. It is widely used and highly secure.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>SHA-3:</Text> A modern and secure algorithm that supports various hash sizes.
      </Text>

      <Text style={styles.subheader}>Applications of Hash Functions</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Password Hashing:</Text> Stores passwords securely by hashing them before saving to databases.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Data Integrity:</Text> Ensures data has not been altered by comparing hash values.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Digital Signatures:</Text> Verifies the authenticity and integrity of messages.
      </Text>

      <Text style={styles.subheader}>Hash Function in Action</Text>
      <Text style={styles.text}>
        Let&apos;s demonstrate hashing using a common cryptographic library in React Native.
      </Text>

      <Text style={styles.subheader}>Example Code: Hashing with SHA-256</Text>
      <Text style={styles.codeBlock}>
*************
      </Text>

      <Text style={styles.subheader}>Explanation of the Example</Text>
      <Text style={styles.text}>
        The example demonstrates hashing a string using the SHA-256 algorithm from the Expo Crypto library. The hash is computed and logged to the console.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },
  subheader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495e",
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  codeBlock: {
    fontSize: 14,
    fontFamily: "Courier",
    backgroundColor: "#ecf0f1",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default HashEncryption;
