import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const SymmetricKey = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Symmetric Encryption (Secret Key Encryption)</Text>

      <Text style={styles.subtitle}>Core Concepts:</Text>
      <View style={styles.section}>
        <Text style={styles.text}>Shared Secret Key: Both the sender and the receiver need to have access to the secret key. This key is used both to encrypt and decrypt the data. The key must be kept confidential and secure from unauthorized access.</Text>
        <Text style={styles.text}>Block and Stream Ciphers: Symmetric encryption algorithms are often classified as block ciphers or stream ciphers.</Text>
      </View>

      <Text style={styles.subtitle}>Block Ciphers:</Text>
      <Text style={styles.text}>These operate on fixed-size blocks of data. For example, AES works with 128-bit blocks.</Text>

      <Text style={styles.subtitle}>Stream Ciphers:</Text>
      <Text style={styles.text}>These encrypt data one bit or byte at a time, making them faster for streaming data.</Text>

      <Text style={styles.subtitle}>Key Distribution Problem:</Text>
      <Text style={styles.text}>A key challenge with symmetric encryption is how to securely share the key between the sender and receiver. This problem is usually addressed by using asymmetric encryption to exchange the symmetric key securely (as in the case of Hybrid encryption).</Text>

      <Text style={styles.subtitle}>Common Symmetric Encryption Algorithms</Text>
      <View style={styles.section}>
        <Text style={styles.text}>AES (Advanced Encryption Standard):</Text>
        <Text style={styles.text}>AES is the most widely used symmetric encryption algorithm today. It is considered highly secure and efficient. AES supports different key sizes: 128-bit, 192-bit, and 256-bit keys. AES operates in multiple modes of operation (e.g., CBC, ECB, CTR) to improve security and handle various data types.</Text>

        <Text style={styles.text}>DES (Data Encryption Standard):</Text>
        <Text style={styles.text}>DES was widely used for decades but is now considered insecure due to its small key size (56 bits). It was replaced by AES in most applications. DES operates in 64-bit blocks.</Text>

        <Text style={styles.text}>3DES (Triple DES):</Text>
        <Text style={styles.text}>3DES is an improvement over DES, applying the DES algorithm three times with different keys (usually 168 bits). It is more secure than DES, but still less secure than AES, and it is also slower due to its multiple encryption steps.</Text>
      </View>

      <Text style={styles.subtitle}>AES Example: Detailed Breakdown</Text>
      <Text style={styles.text}>1. <Text style={styles.bold}>Encryption Process:</Text> In AES, the encryption of the plaintext is done in multiple rounds. For AES-128, there are 10 rounds of processing.</Text>
      <Text style={styles.text}>• SubBytes: Each byte of the data block is substituted with another byte based on a substitution table (S-box).</Text>
      <Text style={styles.text}>• ShiftRows: The rows of the data block are shifted by a certain number of bytes. This step provides diffusion, where the positions of the bytes are altered.</Text>
      <Text style={styles.text}>• MixColumns: This step involves mixing the columns of the data to further obscure the relationship between the plaintext and ciphertext.</Text>
      <Text style={styles.text}>• AddRoundKey: The round key (derived from the original secret key) is XORed with the data block.</Text>

      <Text style={styles.text}>These steps are repeated for 10 rounds (in the case of AES-128). After the final round, the ciphertext is produced.</Text>

      <Text style={styles.text}>2. <Text style={styles.bold}>Decryption Process:</Text> Decryption in AES is essentially the reverse of encryption, where the same secret key is used.</Text>
      <Text style={styles.text}>• AddRoundKey: The round key is XORed with the ciphertext.</Text>
      <Text style={styles.text}>• InvShiftRows: The rows are shifted back to their original positions.</Text>
      <Text style={styles.text}>• InvSubBytes: The bytes are substituted using the inverse of the substitution table.</Text>
      <Text style={styles.text}>• InvMixColumns: The mixing of columns is undone.</Text>

      <Text style={styles.text}>The process is repeated for 9 rounds (since the last round doesn’t require the MixColumns step) until the original plaintext is obtained.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default SymmetricKey;
