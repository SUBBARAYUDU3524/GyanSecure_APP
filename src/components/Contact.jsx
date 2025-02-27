import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Alert,
} from 'react-native';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Replace with your real AdMob Interstitial Ad Unit ID for production

  const handleSubmit = () => {
    try {
      if (!name || !email || !message) {
        Alert.alert('Error', 'Please fill in all the fields.');
        return;
      }

      // Here you can handle the form submission, like sending data to a backend or an email.
      Alert.alert('Thank You', 'Your message has been sent!');
    } catch (error) {
      console.log('Error during form submission: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contact Us</Text>
        <Text style={styles.subHeaderText}>
          We're here to assist you! Feel free to reach out.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={styles.inputField}
        />

        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          style={styles.inputField}
        />

        <Text style={styles.formLabel}>Message</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message"
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <Button title="Send Message" onPress={handleSubmit} color="#007BFF" />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          For inquiries, please email us at: subbarayudu1501@gmail.com
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  inputField: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default ContactPage;
