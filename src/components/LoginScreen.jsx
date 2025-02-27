import React, { useContext, useState, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import UserContext from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(UserContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email.trim(), password);
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('authToken', token);

      Alert.alert('Login Successful', 'Welcome back!', [
        { text: 'OK', onPress: () => navigation.navigate('HomeTabs') },
      ]);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error)
      let errorMessage = 'Login failed. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      }
      console.log(error)
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [email, password, navigation, setIsLoggedIn]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={styles.title}
        entering={FadeIn.delay(200).duration(500)}
      >
        Welcome Back
        {'\n'}Login to Continue
      </Animated.Text>

      <Animated.View
        style={styles.form}
        entering={FadeIn.duration(700)}
        exiting={FadeOut.duration(500)}
      >
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon={() => <Icon name="email" size={24} />} />}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon={() => <Icon name="lock" size={24} />} />}
          right={
            <TextInput.Icon
              icon={() => (
                <Icon name={passwordVisible ? 'visibility-off' : 'visibility'} size={24} />
              )}
              onPress={() => setPasswordVisible((prev) => !prev)}
            />
          }
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={loading}
          disabled={loading}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Login
        </Button>

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            onPress={() => navigation.navigate('Signup')}
            style={styles.signupLink}
          >
            Sign Up
          </Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3b5998',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#6C63FF',
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  signupLink: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});

export default React.memo(LoginScreen);
