import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpScreen = ({navigation}) => {

  const openSupportPage = () => {
    Linking.openURL('https://www.your-support-url.com');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Icon name="help-outline" size={40} color="#4A90E2" />
          <Text style={styles.title}>How can we help you?</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Text style={styles.sectionText}>
            Learn how to get started with our app. You can access all of your information, manage your profile, and explore the features of the app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Issues</Text>
          <Text style={styles.sectionText}>
            If you are having trouble with your account, here are some common solutions:
          </Text>
          <Text style={styles.sectionText}>
            - Unable to log in? Check your credentials or reset your password.
          </Text>
          <Text style={styles.sectionText}>
            - Profile not updating? Try logging out and back in again.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <Text style={styles.sectionText}>
            If you cannot find a solution to your issue, please contact our support team for assistance.
          </Text>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Contact')}>
            <Text style={styles.buttonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
<TouchableOpacity onPress={()=>navigation.navigate('FAQ')}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQ</Text>
          <Text style={styles.sectionText}>
            Here are some frequently asked questions to help you with common concerns:
          </Text>
          <Text style={styles.sectionText}>
            - How do I reset my password?
            - How do I update my profile information?
            - Can I delete my account?
          </Text>
        </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4A90E2',
    marginTop: 10,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HelpScreen;
