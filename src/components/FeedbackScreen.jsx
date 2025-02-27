import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    rating: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (key, value) => {
    if (key === 'rating') {
      if (value === '') {
        // Allow empty rating value
        setFeedback({ ...feedback, [key]: value });
        return;
      }
  
      const numericValue = Number(value);
      if (numericValue < 1 || numericValue > 5) {
        Alert.alert('Validation Error', 'Rating must be a number between 1 and 5.');
        return;
      }
    }
    setFeedback({ ...feedback, [key]: value });
  };
  
  const submitFeedback = async () => {
    if (!feedback.name || !feedback.email || !feedback.rating || !feedback.message) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        await firestore().collection('feedback').add({
          name: feedback.name,
          email: feedback.email,
          rating: feedback.rating,
          message: feedback.message,
          userId: currentUser.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        Alert.alert('Thank You!', 'Your feedback has been submitted successfully.');
        setFeedback({ name: '', email: '', rating: '', message: '' });
      } else {
        Alert.alert('Error', 'You must be logged in to submit feedback.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>We Value Your Feedback</Text>
      <Text style={styles.description}>
        Your feedback helps us improve and provide a better experience. Please take a moment to share your thoughts.
      </Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#888"
        value={feedback.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor="#888"
        value={feedback.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />

      {/* Rating Input */}
      <TextInput
        style={styles.input}
        placeholder="Rate us out of 5 "
        placeholderTextColor="#888"
        value={feedback.rating}
        onChangeText={(text) => handleInputChange('rating', text)}
        keyboardType="numeric"
      />

      {/* Message Input */}
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Your Message"
        placeholderTextColor="#888"
        value={feedback.message}
        onChangeText={(text) => handleInputChange('message', text)}
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={submitFeedback}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#34495e',
    marginBottom: 15,
    elevation: 2,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
