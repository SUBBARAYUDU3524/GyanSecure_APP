import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HybridEncryption = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hybrid Encryption: Overview and Detailed Explanation</Text>
      <Text style={styles.subHeader}>
        <Icon name="lock" size={20} color="#4CAF50" /> Hybrid encryption combines 
        <Text style={styles.highlight}> symmetric encryption </Text>
        and
        <Text style={styles.highlight}> asymmetric encryption </Text>
        to achieve both speed and security.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>How Hybrid Encryption Works</Text>

        <View style={styles.step}>
          <Icon name="key" size={20} color="#FFC107" />
          <Text style={styles.stepHeader}> Key Generation</Text>
        </View>
        <Text style={styles.stepContent}>
          - A symmetric key (e.g., AES key) is generated to encrypt the actual data.
        </Text>
        <Text style={styles.stepContent}>
          - A pair of asymmetric keys (public and private keys) is generated for secure key exchange.
        </Text>

        <View style={styles.step}>
          <Icon name="lock" size={20} color="#2196F3" />
          <Text style={styles.stepHeader}> Data Encryption</Text>
        </View>
        <Text style={styles.stepContent}>
          - The plaintext data is encrypted using the symmetric key with a symmetric encryption algorithm (e.g., AES).
        </Text>
        <Text style={styles.stepContent}>
          - This ensures the encryption process is fast and efficient, especially for large data.
        </Text>

        <View style={styles.step}>
          <Icon name="key" size={20} color="#E91E63" />
          <Text style={styles.stepHeader}> Key Encryption</Text>
        </View>
        <Text style={styles.stepContent}>
          - The symmetric key is encrypted using the recipient's public key with an asymmetric encryption algorithm (e.g., RSA).
        </Text>
        <Text style={styles.stepContent}>
          - This ensures that only the recipient can decrypt the symmetric key using their private key.
        </Text>

        <View style={styles.step}>
          <Icon name="paper-plane" size={20} color="#4CAF50" />
          <Text style={styles.stepHeader}> Data Transmission</Text>
        </View>
        <Text style={styles.stepContent}>
          - The encrypted data and the encrypted symmetric key are sent to the recipient.
        </Text>

        <View style={styles.step}>
          <Icon name="unlock-alt" size={20} color="#FF5722" />
          <Text style={styles.stepHeader}> Decryption</Text>
        </View>
        <Text style={styles.stepContent}>
          - The recipient uses their private key to decrypt the symmetric key.
        </Text>
        <Text style={styles.stepContent}>
          - The decrypted symmetric key is then used to decrypt the data.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  highlight: {
    color: '#E91E63',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 15,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  stepContent: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 35,
    marginBottom: 10,
    color: '#555',
  },
});

export default HybridEncryption;
