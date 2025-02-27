import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const Cryptography = ({ navigation }) => {
  const opacity = useSharedValue(0);
  const viewOpacity = useSharedValue(0);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 2000 }); // Title and description animation
    viewOpacity.value = withTiming(1, { duration: 3000, delay: 1000 }); // Additional text animation
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: withTiming(opacity.value * -20, { duration: 2000 }) }],
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: withTiming(opacity.value * 20, { duration: 2000 }) }],
  }));

  const viewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: viewOpacity.value,
    transform: [{ translateY: withTiming(viewOpacity.value * 30, { duration: 3000 }) }],
  }));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.descriptionContainer}>
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>What is Cryptography in Computer Networks?</Animated.Text>
        <Animated.Text style={[styles.description, descriptionAnimatedStyle]}>
          Cryptography is the practice and study of techniques for securing communication and data
          in the presence of adversaries. In computer networks, cryptography ensures that data is
          transmitted securely over the network, preventing unauthorized access, interception, or
          alteration of the data.
        </Animated.Text>

        <Animated.View style={[styles.noBgAdditionalInfo, viewAnimatedStyle]}>
          <Text style={styles.additionalTitle}>Key Concepts of Cryptography</Text>
          <Text style={styles.description}>• <Text style={styles.bold}>Confidentiality:</Text> Ensures that the information is accessible only to the intended recipient. Achieved using encryption, where data is encoded into an unreadable format and can only be decoded by authorized users with the decryption key.</Text>
          <Text style={styles.description}>• <Text style={styles.bold}>Integrity:</Text> Ensures that the data is not altered during transmission. Accomplished through mechanisms like hash functions or message digests.</Text>
          <Text style={styles.description}>• <Text style={styles.bold}>Authentication:</Text> Verifies the identity of the sender or receiver in a communication process. Achieved using digital signatures, certificates, or secure protocols.</Text>
          <Text style={styles.description}>• <Text style={styles.bold}>Non-repudiation:</Text> Ensures that a sender cannot deny sending the data, and a receiver cannot deny receiving it. Implemented using cryptographic techniques like digital signatures.</Text>
        </Animated.View>

        <Animated.View style={[styles.additionalInfo, viewAnimatedStyle]}>
          <Text style={styles.additionalTitle}>
            The Cryptographic Techniques are Divided Into Two Types:
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ClassicalEncryption')}>
            <Text style={styles.bulletPoint}>• Classical Encryption Techniques</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ModernEncryption')}>
            <Text style={styles.bulletPoint}>• Modern Encryption Techniques</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Cryptography;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  description: {
    fontSize: 17,
    lineHeight: 26,
    color: '#34495e',
    textAlign: 'justify',
    marginBottom: 10, // Decreased bottom margin for better spacing
  },
  additionalInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#eaf6f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b8e0de',
    elevation: 2,
    marginBottom: 60, // Reduced margin bottom to tighten space
  },
  backButton:{
    marginLeft:10,
    marginRight:20
  },
  noBgAdditionalInfo: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
  },
  additionalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d6a6a',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 18,
    color: '#34495e',
    marginVertical: 5,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
  },
});
