import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function AuthScreen({ navigation, route }) {
  const { isSignup } = route.params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleAuth = async () => {
    setIsLoading(true); // Start loading
    try {
      if (isSignup) {
        // Create user with email and password
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        // Store full name and email in Firestore
        await firestore().collection('users').doc(userCredential.user.uid).set({
          fullName,
          email,
        });

        Alert.alert('Success', 'Signup Successful');
        // Navigate to the login screen
        navigation.navigate('AuthScreen', { isSignup: false });
      } else {
        // Login user
        await auth().signInWithEmailAndPassword(email, password);
        Alert.alert('Success', 'Login Successful');
        // Navigate to your main screen
        navigation.navigate('HomeTabs');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? 'Create Account' : 'Welcome Back'}</Text>
      {isSignup && (
        <View style={styles.inputContainer}>
          <Icon name="person" size={24} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleAuth}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AuthScreen', { isSignup: !isSignup })}
      >
        <Text style={styles.switchText}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#a5a5a5', // Gray out button when disabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6200ea',
  },
});
