import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Quantum = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Quantum Cryptography: An Emerging Concept</Text>
      </View>

      {/* Introduction */}
      <View style={styles.sectionContainer}>
        <Text style={styles.paragraph}>
          Quantum cryptography is a revolutionary field that leverages the principles of quantum mechanics to enhance the security of cryptographic systems. It is fundamentally different from traditional cryptography, as it exploits the unique properties of quantum mechanics—such as superposition and entanglement—to create secure communication channels. Quantum cryptography holds the potential to revolutionize data security, especially in the face of powerful quantum computers that may break traditional encryption methods like RSA and ECC.
        </Text>
      </View>

      {/* Key Concepts */}
      <View style={styles.sectionContainer}>
        <Text style={styles.subHeader}>Key Concepts of Quantum Cryptography</Text>
        <Text style={styles.paragraph}>
          Quantum Mechanics: Quantum cryptography is based on the principles of quantum mechanics, which govern the behavior of matter and energy at the smallest scales (such as atoms and photons).
        </Text>
        <Text style={styles.paragraph}> 
          Superposition: A quantum bit (qubit) can exist in multiple states at the same time, unlike a classical bit that is either 0 or 1.
        </Text>
        <Text style={styles.paragraph}>
          Entanglement: Two quantum particles can be entangled, meaning their states are correlated, no matter the distance between them.
        </Text>
        <Text style={styles.paragraph}>
          Uncertainty Principle: Measuring a quantum state can alter its state. This is a fundamental principle that is utilized in quantum cryptography for secure communication.
        </Text>
      </View>

      {/* Quantum Key Distribution */}
      <View style={styles.sectionContainer}>
        <Text style={styles.subHeader}>Quantum Key Distribution (QKD)</Text>
        <Text style={styles.paragraph}>
          The most important application of quantum cryptography is Quantum Key Distribution (QKD). It allows two parties to securely share a secret key over a potentially insecure communication channel. The most famous QKD protocol is BB84, developed by Charles Bennett and Gilles Brassard in 1984.
        </Text>
      </View>

      {/* Encryption and Decryption Process */}
      <View style={styles.sectionContainer}>
        <Text style={styles.subHeader}>Quantum Cryptography: Encryption and Decryption Process</Text>
        <Text style={styles.subSubHeader}>1. Encryption (Using Quantum Key Distribution)</Text>
        <Text style={styles.paragraph}>
          The encryption process in quantum cryptography involves the secure exchange of a key using the principles of quantum mechanics.
        </Text>
        <Text style={styles.subSubHeader}>Step-by-Step Encryption Process:</Text>
        <Text style={styles.paragraph}>
          - Key Generation: Alice generates a quantum key using the quantum state of photons and sends them over a quantum channel to Bob.
        </Text>
        <Text style={styles.paragraph}>
          - Measurement and Key Extraction: Bob measures the qubits in randomly chosen bases and compares with Alice's results to ensure security.
        </Text>

        <Text style={styles.subSubHeader}>2. Decryption (Using the Quantum Key)</Text>
        <Text style={styles.paragraph}>
          Bob uses the shared symmetric key to decrypt the ciphertext encrypted by Alice, applying the appropriate decryption algorithm.
        </Text>
      </View>

      {/* Advantages */}
      <View style={styles.sectionContainer}>
        <Text style={styles.subHeader}>Advantages of Quantum Cryptography</Text>
        <Text style={styles.paragraph}>
          Security Against Quantum Computers: Quantum cryptography is resistant to attacks from quantum computers, which may break traditional encryption algorithms like RSA and ECC.
        </Text>
        <Text style={styles.paragraph}>
          Unbreakable Keys: Any eavesdropping attempt on the quantum channel will alter the state of the qubits, making it detectable.
        </Text>
        <Text style={styles.paragraph}>
          Forward Secrecy: Even if an eavesdropper intercepts past communications, they cannot decrypt messages without the ephemeral quantum key.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a2a2a',
    marginBottom: 10,
  },
  subSubHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginVertical: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 10,
  },
});

export default Quantum;
