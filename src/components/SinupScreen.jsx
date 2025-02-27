import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('male'); // Default selection
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisiblee, setPasswordVisiblee] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword || !mobileNumber) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    if (mobileNumber.length !== 10) {
      Alert.alert('Error', 'Enter a valid 10-digit mobile number!');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
      const { uid } = user;

      await user.updateProfile({
        displayName: fullName,
        photoURL: null,
      });

      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          fullName,
          email,
          mobileNumber,
          gender,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'Signup successful!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.Text
          style={styles.title}
          entering={FadeIn.delay(200).duration(500)}
        >
          Create Your Account
        </Animated.Text>

        <Animated.View
          style={styles.form}
          entering={FadeIn.duration(700)}
          exiting={FadeOut.duration(500)}
        >
          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon={() => <Icon name="person" size={24} />} />}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
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
                icon={() => <Icon name={passwordVisible ? 'visibility-off' : 'visibility'} size={24} />}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!passwordVisiblee}
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon={() => <Icon name="lock" size={24} />} />}
            right={
              <TextInput.Icon
                icon={() => <Icon name={passwordVisiblee ? 'visibility-off' : 'visibility'} size={24} />}
                onPress={() => setPasswordVisiblee(!passwordVisiblee)}
              />
            }
          />

          <TextInput
            label="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            left={<TextInput.Icon icon={() => <Icon name="phone" size={24} />} />}
          />

          <View style={styles.genderContainer}>
            <Text style={styles.genderLabel}>Gender</Text>
            <RadioButton.Group
              onValueChange={(value) => setGender(value)}
              value={gender}
            >
              <View style={styles.radioGroup}>
                <RadioButton.Item label="Male" value="male" />
                <RadioButton.Item label="Female" value="female" />
                <RadioButton.Item label="Other" value="other" />
              </View>
            </RadioButton.Group>
          </View>

          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.button}
            loading={loading}
            disabled={loading}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Signup
          </Button>

          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.signupLink}
            >
              Login
            </Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
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
  title: {
    fontSize: 26,
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
  genderContainer: {
    marginBottom: 15,
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default SignupScreen;
