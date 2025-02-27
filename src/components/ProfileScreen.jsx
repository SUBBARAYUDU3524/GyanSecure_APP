import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useContext } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserContext from '../UserContext';

const ProfileScreen = ({navigation}) => {
  const { setIsLoggedIn } = useContext(UserContext);
  const user = auth().currentUser;
console.log(user)
  const handleLogout = () => {
    AsyncStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://www.termsfeed.com/live/99e7a660-cc9a-4a76-a1fc-015e6317336e');
  };
  const openTermsAndConditions = () => {
    Linking.openURL('https://www.freeprivacypolicy.com/live/6d5d2a04-0229-43da-98a8-16c6bf737e42');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
      <Image
  source={user?.photoURL ? { uri: user?.photoURL } : require('../assets/profile.png')}
  style={styles.profileImage}
/>
        <Text style={styles.userName}>{user?.displayName || 'Subbarayudu'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'subbu@gmail.com'}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={openTermsAndConditions}>
          <Icon name="class" size={28} color="#4A90E2" />
          <Text style={styles.menuText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate('Help')}>
          <Icon name="help" size={28} color="#4A90E2" />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={openPrivacyPolicy}>
          <Icon name="privacy-tip" size={28} color="#4A90E2" />
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="share" size={28} color="#4A90E2" />
          <Text style={styles.menuText}>Share App</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#718096',
  },
  menuContainer: {
    marginVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#1A202C',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#E53E3E',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;
