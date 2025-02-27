import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {getAuth} from '@react-native-firebase/auth';
import BannerAdComponent from './BannerAdComponent';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [slideAnim] = useState(new Animated.Value(-width * 0.7));

  const user = getAuth().currentUser;
  console.log(user);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarOpen(false));
    } else {
      setSidebarOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleItemPress = item => {
    setActiveItem(item);
    toggleSidebar();
  };
  const handleEncryption = () => {
    console.log('Encryption button pressed');
    // Add your encryption logic here
  };

  const handleDecryption = () => {
    console.log('Decryption button pressed');
    // Add your decryption logic here
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Entypo name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>GyanSecure</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../assets/profile.png')} // Replace with your image path
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <Text style={styles.welcomeText}>
          Welcome {user?.displayName || 'Subbarayudu'}
        </Text>
        <View style={styles.content}>
          <Image
            source={require('../assets/cryptography.jpg')} // Replace with your image path
            style={styles.bannerImage}
          />
          <View style={styles.container}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Cryptography')}>
                <MaterialIcon name="security" size={24} color="#007bff" />
                <Text style={styles.cardText}>
                  Cryptography & its Techniques
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ClassicalEncryption')}>
                <MaterialIcon
                  name="enhanced-encryption"
                  size={24}
                  color="#007bff"
                />
                <Text style={styles.cardText}>
                  Classical Encryption Techniques
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ModernEncryption')}>
                <Entypo name="lock" size={24} color="#007bff" />
                <Text style={styles.cardText}>
                  Modern Encryption Techniques
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Sources')}>
                <Icon name="video-camera" size={24} color="#007bff" />
                <Text style={styles.cardText}>Sources</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sidebar */}
        {isSidebarOpen && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={toggleSidebar}
          />
        )}
        <Animated.View
          style={[styles.sidebar, {transform: [{translateX: slideAnim}]}]}>
          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeItem === 'Home' && styles.activeItem,
            ]}
            onPress={() => {
              handleItemPress('Home'); // Your custom handler for the active state
              navigation.navigate('Home'); // Navigate to the Signup screen
            }}>
            <Entypo
              name="home"
              size={20}
              style={activeItem === 'Home' ? styles.activeIcon : styles.icon}
            />
            <Text
              style={
                activeItem === 'Home' ? styles.activeText : styles.itemText
              }>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeItem === 'About' && styles.activeItem,
            ]}
            onPress={() => {
              handleItemPress('About');
              navigation.navigate('About');
            }}>
            <Entypo
              name="info"
              size={20}
              style={activeItem === 'About' ? styles.activeIcon : styles.icon}
            />
            <Text
              style={
                activeItem === 'About' ? styles.activeText : styles.itemText
              }>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeItem === 'Feedback' && styles.activeItem,
            ]}
            onPress={() => {
              handleItemPress('Feedback');
              navigation.navigate('Feedback');
            }}>
            <Entypo
              name="info"
              size={20}
              style={
                activeItem === 'Feedback' ? styles.activeIcon : styles.icon
              }
            />
            <Text
              style={
                activeItem === 'Feedback' ? styles.activeText : styles.itemText
              }>
              Feedback
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeItem === 'Project Guide' && styles.activeItem,
            ]}
            onPress={() => {
              handleItemPress('Project Guide'); // Your custom handler for the active state
              navigation.navigate('Project Guide'); // Navigate to the Signup screen
            }}>
            <Entypo
              name="user"
              size={20}
              style={
                activeItem === 'Project Guide' ? styles.activeIcon : styles.icon
              }
            />
            <Text
              style={
                activeItem === 'Project Guide'
                  ? styles.activeText
                  : styles.itemText
              }>
              Project Guide
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeItem === 'Contact' && styles.activeItem,
            ]}
            onPress={() => {
              handleItemPress('Contact'); // Your custom handler for the active state
              navigation.navigate('Contact'); // Navigate to the Signup screen
            }}>
            <Entypo
              name="phone"
              size={20}
              style={activeItem === 'Contact' ? styles.activeIcon : styles.icon}
            />
            <Text
              style={
                activeItem === 'Contact' ? styles.activeText : styles.itemText
              }>
              Contact
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeItem === 'FAQ' && styles.activeItem,
            ]}
            onPress={() => {
              handleItemPress('FAQ'); // Your custom handler for the active state
              navigation.navigate('FAQ'); // Navigate to the Signup screen
            }}>
            <Entypo
              name="text-document"
              size={20}
              style={activeItem === 'FAQ' ? styles.activeIcon : styles.icon}
            />
            <Text
              style={
                activeItem === 'FAQ' ? styles.activeText : styles.itemText
              }>
              FAQ'S
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    justifyContent: 'flex-end', // Aligns the button at the bottom of the screen
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    padding: 15,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red', // Red background for the button
    width: '90%', // Button width
    paddingVertical: 15, // Vertical padding for the button
    borderRadius: 10, // Rounded corners
    alignItems: 'center', // Center the text horizontally
    marginBottom: 10, // Margin from the bottom edge of the screen
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  banner: {
    marginLeft: -10,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 5,
  },
  cardText: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 66,
    left: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: 'white',
    padding: 20,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
  icon: {
    color: 'black',
  },
  activeItem: {
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
  },
  activeText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  activeIcon: {
    color: '#007bff',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});
