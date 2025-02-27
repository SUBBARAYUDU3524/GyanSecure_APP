import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ClassicalEncryptionScreen = ({navigation}) => {
  const titleOpacity = useSharedValue(0);
  const descriptionOpacity = useSharedValue(0);
  const descriptionTranslateX = useSharedValue(-300);
  const titleTranslateX = useSharedValue(300);

  useEffect(() => {
    // Animating the title and description
    titleOpacity.value = withTiming(1, { duration: 1500 });
    titleTranslateX.value = withTiming(0, { duration: 1500 });

    descriptionOpacity.value = withTiming(1, { duration: 1500, delay: 500 });
    descriptionTranslateX.value = withTiming(0, { duration: 1500, delay: 500 });
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateX: titleTranslateX.value }],
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: descriptionOpacity.value,
    transform: [{ translateX: descriptionTranslateX.value }],
  }));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Title */}
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          Classical Encryption Techniques
        </Animated.Text>

        {/* Description */}
        <Animated.Text style={[styles.description, descriptionAnimatedStyle]}>
          Cryptography is the practice and study of techniques for securing communication and data
          in the presence of adversaries. In computer networks, cryptography ensures that data is
          transmitted securely over the network, preventing unauthorized access, interception, or
          alteration of the data.
        </Animated.Text>


        {/* Subtypes */}
        <Text style={styles.subtitle}>Types of Classical Encryption</Text>
        <Text style ={styles.subTitle1}>There are Mainly Five Types Of Modern Encryption Techniques. They </Text>
<TouchableOpacity onPress={()=>navigation.navigate('CaeserCipher')}>
        <View style={styles.containerInfo}>
          <Text style={styles.subTitle}>1.Caesar Cipher:</Text>
          <Text style={styles.subText}>
          The Caesar Cipher is a substitution cipher that shifts each letter in the plaintext by a fixed number of positions down or up the alphabet.
          </Text>
         
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('PlayfairCipher')}>
        <View style={styles.containerInfo}>
          <Text style={styles.subTitle}>2. Playfair Cipher:</Text>
          <Text style={styles.subText}>
          The Playfair Cipher is a digraph substitution cipher that encrypts pairs of letters using a 5x5 matrix constructed from a keyword.
          </Text>
         
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('MonoAlphabeticCipher')}>
        <View style={styles.containerInfo}>
          <Text style={styles.subTitle}>3.Monoalphabetic Cipher:</Text>
          <Text style={styles.subText}>
          The Monoalphabetic Cipher replaces each letter in the plaintext with a fixed letter from a mixed alphabet.
          </Text>
         
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('PolyAlphabetic')}>
        <View style={styles.containerInfo}>
          <Text style={styles.subTitle}>4.Polyalphabetic Cipher (Vigenère Cipher):</Text>
          <Text style={styles.subText}>
          The Vigenère Cipher uses a keyword to shift letters in the plaintext, with the shift varying based on the position in the keyword.
          </Text>
         
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('OneTimePad')}>
        <View style={styles.containerInfo}>
          <Text style={styles.subTitle}>5.One-Time Pad (OTP):</Text>
          <Text style={styles.subText}>
          The One-Time Pad (OTP) is a cryptographic technique where a plaintext is encrypted using a key of the same length, combined via a bitwise XOR operation. It provides perfect secrecy if the key is truly random, used only once, and kept secret. Its impracticality lies in key generation, distribution, and management.
          </Text>
         
        </View>
        
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('RailFence')}>
        <View style={styles.containerInfo}>
          <Text style={styles.subTitle}>5.Rail Fence Cipher:</Text>
          <Text style={styles.subText}>
          The Rail Fence Cipher is a transposition cipher that writes plaintext in a zigzag pattern across multiple rows.
          </Text>
         
        </View>
       
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('RowColumnTransposition')}>
        <View style={styles.containerInfo}>
          <Text style={styles.subTitle}>6.Row-Column Transposition:</Text>
          <Text style={styles.subText}>
          This cipher rearranges the plaintext into rows and then reads the text column by column, based on a given key.
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
  },
  scrollView: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  description: {
    fontSize: 17,
    marginTop:15,
    lineHeight: 26,
    color: '#34495e',
    textAlign: 'justify',
    paddingHorizontal:10,
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
    lineHeight:20,
  },
  
  containerInfo: {
    padding: 15,
    backgroundColor: '#eaf6f6',
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal:10,
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
