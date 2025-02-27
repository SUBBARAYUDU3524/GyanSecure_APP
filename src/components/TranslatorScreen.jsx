import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Provider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const TranslateScreen = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetLanguage1, setTargetLanguage1] = useState('English');
  const [targetLanguage2, setTargetLanguage2] = useState('Telugu');
  const [menuVisible1, setMenuVisible1] = useState(false);
  const [menuVisible2, setMenuVisible2] = useState(false);

  const languages = ['Telugu', 'English', 'Hindi', 'Spanish', 'French', 'German'];

  return (
    <Provider>
      <View style={styles.container}>
        {/* First Container */}
        <View style={styles.firstContainer}>
          {/* Language Buttons and Arrows */}
          <View style={styles.langRow}>
            {/* First Language Menu */}
            <Menu
              visible={menuVisible1}
              onDismiss={() => setMenuVisible1(false)}
              anchor={
                <Button
                  mode="outlined"
                  textColor="#fff"
                  onPress={() => setMenuVisible1(true)}
                  style={styles.languageButton}
                >
                  {targetLanguage1}
                </Button>
              }
            >
              {languages.map((lang) => (
                <Menu.Item
                  key={lang}
                  onPress={() => {
                    setTargetLanguage1(lang);
                    setMenuVisible1(false);
                  }}
                  title={lang}
                />
              ))}
            </Menu>

            {/* Left-to-Right Arrow */}
            <Fontisto name="arrow-swap" size={24} color="#fff" style={styles.arrowIcon} />
            {/* Second Language Menu */}
            <Menu
              visible={menuVisible2}
              onDismiss={() => setMenuVisible2(false)}
              anchor={
                <Button
                  mode="outlined"
                  textColor="#fff"
                  onPress={() => setMenuVisible2(true)}
                  style={styles.languageButton}
                >
                  {targetLanguage2}
                </Button>
              }
            >
              {languages.map((lang) => (
                <Menu.Item
                  key={lang}
                  onPress={() => {
                    setTargetLanguage2(lang);
                    setMenuVisible2(false);
                  }}
                  title={lang}
                />
              ))}
            </Menu>

            {/* Right-to-Left Arrow */}
            
          </View>

          {/* Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Enter text"
            placeholderTextColor="#888"
            value={sourceText}
            onChangeText={setSourceText}
          />
          <TouchableOpacity style={styles.micIcon}>
            <Icon name="microphone" size={35} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Second Container */}
        <View style={styles.secondContainer}></View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 120,
    paddingTop:30,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  firstContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    justifyContent: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 10,
    position: 'relative',
  },
  secondContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  languageButton: {
    width: 150,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#333',
    borderRadius: 5,
  },
  arrowIcon: {
    marginHorizontal: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 28,
    borderWidth: 0,
  },
  micIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

export default TranslateScreen;
