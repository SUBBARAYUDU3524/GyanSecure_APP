import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import BannerAdComponent from './BannerAdComponent';

const ClassicalEncryptionScreen = ({navigation}) => {
  const titleOpacity = useSharedValue(0);
  const descriptionOpacity = useSharedValue(0);
  const descriptionTranslateX = useSharedValue(-300);
  const titleTranslateX = useSharedValue(300);

  useEffect(() => {
    // Animating the title and description
    titleOpacity.value = withTiming(1, {duration: 1500});
    titleTranslateX.value = withTiming(0, {duration: 1500});

    descriptionOpacity.value = withTiming(1, {duration: 1500, delay: 500});
    descriptionTranslateX.value = withTiming(0, {duration: 1500, delay: 500});
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{translateX: titleTranslateX.value}],
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: descriptionOpacity.value,
    transform: [{translateX: descriptionTranslateX.value}],
  }));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Title */}
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          Modern Encryption Techniques
        </Animated.Text>

        {/* Description */}
        <Animated.Text style={[styles.description, descriptionAnimatedStyle]}>
          Cryptography is the practice and study of techniques for securing
          communication and data in the presence of adversaries. In computer
          networks, cryptography ensures that data is transmitted securely over
          the network, preventing unauthorized access, interception, or
          alteration of the data.
        </Animated.Text>

        {/* Subtypes */}
        <Text style={styles.subtitle}>Types of Modern Encryption</Text>
        <Text style={styles.subTitle1}>
          There are Mainly Five Types Of Modern Encryption Techniques. They{' '}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('SymmetricKey')}>
          <View style={styles.containerInfo}>
            <Text style={styles.subTitle}>1.Symmetric Key Encryption:</Text>
            <Text style={styles.subText}>
              Uses a single key for both encryption and decryption.
            </Text>
            <Text style={styles.subText}>Algorithms:</Text>
            <Text style={styles.subText}>• Data Encryption Standard (DES)</Text>
            <Text style={styles.subText}>
              • Advanced Encryption Standard (AES)
            </Text>
            <Text style={styles.subText}>• Triple DES (3DES)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AsymmetricKey')}>
          <View style={styles.containerInfo}>
            <Text style={styles.subTitle}>2.Asymmetric Key Encryption:</Text>
            <Text style={styles.subText}>
              Uses two keys: a public key for encryption and a private key for
              decryption.
            </Text>
            <Text style={styles.subText}>Algorithms:</Text>
            <Text style={styles.subText}>• RSA</Text>
            <Text style={styles.subText}>
              • Elliptic Curve Cryptography (ECC)
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('HashEncryption')}>
          <View style={styles.containerInfo}>
            <Text style={styles.subTitle}>3.Hash Functions:</Text>
            <Text style={styles.subText}>
              Convert data into a fixed-length hash value that cannot be
              reversed.
            </Text>
            <Text style={styles.subText}>Algorithms:</Text>
            <Text style={styles.subText}>• SHA-256</Text>
            <Text style={styles.subText}>• MD5</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('HybridEncryption')}>
          <View style={styles.containerInfo}>
            <Text style={styles.subTitle}>4.Hybrid Encryption:</Text>
            <Text style={styles.subText}>
              Combines symmetric and asymmetric encryption.
            </Text>
            <Text style={styles.subText}>
              Example: TLS/SSL protocols use RSA for key exchange and AES for
              bulk data encryption.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Quantum')}>
          <View style={styles.containerInfo}>
            <Text style={styles.subTitle}>
              5.Quantum Cryptography (Emerging):
            </Text>
            <Text style={styles.subText}>
              Explores quantum mechanics principles for ultra-secure encryption.
            </Text>
            <Text style={styles.subText}>
              Example: Quantum Key Distribution (QKD).
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ClassicalEncryptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollView: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  description: {
    fontSize: 17,
    marginTop: 15,
    lineHeight: 26,
    color: '#34495e',
    textAlign: 'justify',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d6a6a',
  },
  subTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    lineHeight: 20,
  },

  containerInfo: {
    padding: 15,
    backgroundColor: '#eaf6f6',
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#b8e0de',
    elevation: 2,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  subText: {
    fontSize: 16,
    color: '#34495e',
    marginVertical: 5,
  },
});
