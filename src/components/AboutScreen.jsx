import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutScreen = ({navigation}) => {
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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Icon name="lock" size={40} color="#007ACC" />
        <Text style={styles.title}>About Cryptography App</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.subtitle}>Overview</Title>
          <Paragraph style={styles.description}>
            Welcome to the **Cryptography App**, your trusted solution for
            learning and practicing various encryption and decryption
            techniques. With over 30 years of experience in cryptographic
            sciences, we aim to simplify complex algorithms and bring them to
            your fingertips.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.subtitle}>Key Features</Title>
          <Paragraph style={styles.description}>
            This app allows you to explore and implement the following
            cryptographic techniques:
          </Paragraph>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Icon name="check-circle" size={20} color="#007ACC" />
              <Text style={styles.listText}>Playfair Cipher</Text>
            </View>
            <View style={styles.listItem}>
              <Icon name="check-circle" size={20} color="#007ACC" />
              <Text style={styles.listText}>Caesar Cipher</Text>
            </View>
            <View style={styles.listItem}>
              <Icon name="check-circle" size={20} color="#007ACC" />
              <Text style={styles.listText}>Monoalphabetic Cipher</Text>
            </View>
            <View style={styles.listItem}>
              <Icon name="check-circle" size={20} color="#007ACC" />
              <Text style={styles.listText}>Polyalphabetic Cipher</Text>
            </View>
            <View style={styles.listItem}>
              <Icon name="check-circle" size={20} color="#007ACC" />
              <Text style={styles.listText}>Rail Fence Cipher</Text>
            </View>
            <View style={styles.listItem}>
              <Icon name="check-circle" size={20} color="#007ACC" />
              <Text style={styles.listText}>Row-Column Transposition</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.subtitle}>Why Choose Us?</Title>
          <Paragraph style={styles.description}>
            - Expertise from 30 years of cryptographic research and application.
            {'\n'}- Comprehensive coverage of traditional and modern encryption
            methods.{'\n'}- Intuitive and user-friendly design to make learning
            enjoyable.
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#007ACC',
  },
  card: {
    backgroundColor: '#FFFFFF',
    elevation: 5,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#444',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  backButton: {
    marginLeft: 10,
    marginRight: 20,
    padding: 8,
    backgroundColor: '#E6F7FF', // Subtle blue background
    borderRadius: 50, // Circular button style
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default AboutScreen;
