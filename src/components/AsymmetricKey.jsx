
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

const AsymmetricKey = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Asymmetric Encryption (Public Key Encryption)</Text>

      <Text style={styles.sectionTitle}>Core Concepts</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>Public and Private Keys:</Text>
        <Text style={styles.text}>
          The public key is used to encrypt the data and can be shared openly.
          The private key is kept secret and is used to decrypt the data.
          These keys are generated together, and a message encrypted with one key can only be decrypted with the other.
        </Text>

        <Text style={styles.subtitle}>Uni-Directional Encryption:</Text>
        <Text style={styles.text}>
          Public keys ensure that sensitive data can only be read by the intended recipient who possesses the corresponding private key.
          Similarly, data encrypted with the private key can be verified or decrypted using the public key, enabling digital signatures.
        </Text>

        <Text style={styles.subtitle}>Security:</Text>
        <Text style={styles.text}>
          The private key must always remain confidential to prevent unauthorized access.
          The strength of asymmetric encryption lies in the computational difficulty of deriving the private key from the public key.
        </Text>

        <Text style={styles.subtitle}>Applications:</Text>
        <Text style={styles.text}>
          - Secure communication (e.g., HTTPS)
          - Digital signatures for verifying authenticity
          - Key exchange in hybrid encryption systems
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Popular Asymmetric Encryption Algorithms</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>RSA (Rivest-Shamir-Adleman):</Text>
        <Text style={styles.text}>- Widely used for secure data transmission.</Text>
        <Text style={styles.text}>- Key sizes typically range from 1024 to 4096 bits.</Text>
        <Text style={styles.text}>- Relies on the difficulty of factoring large integers.</Text>

        <Text style={styles.text}>Elliptic Curve Cryptography (ECC):</Text>
        <Text style={styles.text}>- More efficient than RSA for smaller key sizes, offering the same level of security.</Text>
        <Text style={styles.text}>- Used in lightweight devices such as smartphones and IoT.</Text>

        <Text style={styles.text}>DSA (Digital Signature Algorithm):</Text>
        <Text style={styles.text}>- Primarily used for digital signatures.</Text>

        <Text style={styles.text}>Diffie-Hellman:</Text>
        <Text style={styles.text}>- A key exchange algorithm that enables secure sharing of symmetric keys over an insecure channel.</Text>
      </View>

      <Text style={styles.sectionTitle}>How Asymmetric Encryption Works</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>Key Pair Generation:</Text>
        <Text style={styles.text}>
          A pair of keys (public and private) is generated using mathematical algorithms like RSA or ECC.
        </Text>

        <Text style={styles.subtitle}>Encryption Process:</Text>
        <Text style={styles.text}>
          The sender encrypts the plaintext using the recipient’s public key.
          The encrypted text (ciphertext) is then sent to the recipient.
        </Text>

        <Text style={styles.subtitle}>Decryption Process:</Text>
        <Text style={styles.text}>
          The recipient uses their private key to decrypt the ciphertext back into plaintext.
        </Text>

        <Text style={styles.subtitle}>Digital Signature:</Text>
        <Text style={styles.text}>
          The sender encrypts a message or hash using their private key.
          The recipient decrypts it using the sender’s public key to verify the authenticity.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 15,
    color: '#444',
  },
  sectionContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: '#555',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#666',
    marginVertical: 5,
  },
});

export default AsymmetricKey;
