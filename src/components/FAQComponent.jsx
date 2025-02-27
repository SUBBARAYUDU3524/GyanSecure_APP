import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQComponent = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqData = [
    { question: 'What is the Playfair Cipher?', answer: 'The Playfair cipher is a digraph substitution cipher invented by Charles Wheatstone, but popularized by Lord Playfair.' },
    { question: 'How does the Playfair Cipher work?', answer: 'It encrypts pairs of letters (digraphs) using a 5x5 grid containing a keyword and the alphabet (excluding J).' },
    { question: 'What is the importance of the keyword in Playfair Cipher?', answer: 'The keyword determines the arrangement of letters in the 5x5 grid, which is critical for encryption and decryption.' },
    { question: 'How are digraphs formed in the Playfair Cipher?', answer: 'The plaintext is divided into pairs of letters, adding filler letters (e.g., X) if necessary to prevent duplicates or odd-length pairs.' },
    { question: 'What are the encryption rules for the Playfair Cipher?', answer: 'Digraphs are encrypted based on their positions in the grid: same row, same column, or forming a rectangle.' },
    { question: 'How is decryption performed in the Playfair Cipher?', answer: 'Decryption reverses the encryption rules, finding digraphs in the grid and applying the inverse operations.' },
    { question: 'How is the Playfair grid created?', answer: 'The keyword is written first, followed by the remaining letters of the alphabet (excluding J), ensuring no repetitions.' },
    { question: 'What are the limitations of the Playfair Cipher?', answer: 'It is vulnerable to frequency analysis and less secure compared to modern ciphers.' },
    { question: 'Why does the Playfair Cipher omit the letter J?', answer: 'The letters I and J are treated as the same to fit the alphabet into a 5x5 grid.' },
    { question: 'Can the Playfair Cipher be used for secure communication?', answer: 'It is not secure by modern standards but was historically significant for its simplicity and efficiency.' },
  ];

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      {faqData.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.faqHeader}>
            <Text style={styles.question}>{item.question}</Text>
            <Icon name={expandedIndex === index ? 'remove' : 'add'} size={24} color="#333" style={styles.icon} />
          </TouchableOpacity>
          {expandedIndex === index && (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  faqItem: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f0f4f8',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flexShrink: 1,
  },
  icon: {
    marginLeft: 8,
  },
  answerContainer: {
    marginTop: 12,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007aff',
  },
  answer: {
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 24,
  },
});

export default FAQComponent;
