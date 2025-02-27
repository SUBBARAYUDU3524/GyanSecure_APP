import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const ProjectGuide = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Project Guide</Text>
      </View>

      <View style={styles.imageContainer}>
        <FastImage
          source={require('../assets/madam.jpg')} // Replace with your image path
          style={styles.professorImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.professorName}>Dr. M.Padmavathamma</Text>
        <Text style={styles.professorTitle}>Professor and Chairman, BOS</Text>
        <Text style={styles.professorDetails}>M.Sc., M.Ed., M.S., M.Phil., Ph.D.</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About</Text>
        <Text style={styles.infoText}>
          Prof. M.Padmavathamma is a distinguished Professor in the Department of Computer Science, S.V. University, Tirupati. She has rendered 29 years and 8 months of academic service, contributing significantly in academic and administrative capacities, including Coordinator, Head, and Chairperson of various Boards of Studies. She has also served as Joint Secretary of UGC, New Delhi, during 2013, with remarkable satisfaction.
        </Text>
        <Text style={styles.infoText}>
          She has successfully completed 5 UGC and 3 DST research projects, totaling over ₹2 crore. She has guided 21 Ph.D. scholars, including one foreign scholar from Kuwait, and currently supervises one from Denmark. She has also guided numerous M.Phil. and M.Tech. projects.
        </Text>
        <Text style={styles.infoText}>
          Her research interests include Cryptography & Network Security, Data Mining, Image Processing, Cloud Computing, Big Data Analytics, and Cyber Security.
        </Text>
      </View>

      <View style={styles.researchContainer}>
        <Text style={styles.infoTitle}>Research and Achievements</Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Publications:</Text> 109 research papers in national and international journals and conferences.
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Books:</Text> Authored a book titled "Information Security" (ISBN: 978-81-908497-1-5).
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Projects:</Text> 9 research projects completed and 2 ongoing.
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Awards:</Text> State Best Teacher Award (2014), Best Researcher Award (ICT, Kuwait, 2010), Outstanding Researcher Award (China, 2011), and Best Keynote Speaker (Malaysia, 2012).
        </Text>
      </View>

      
    </ScrollView>
  );
};

export default ProjectGuide;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensures ScrollView content is scrollable if overflowing
    backgroundColor: '#f4f4f4',
    padding: 20,
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  professorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#666',
    marginBottom: 10,
  },
  professorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  professorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  professorDetails: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  researchContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
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
