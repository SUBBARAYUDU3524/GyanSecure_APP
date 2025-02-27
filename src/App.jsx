import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ActivityIndicator,
  View,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {ToastProvider} from 'react-native-toast-notifications';

// Import your components
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import NotificationScreen from './components/NotificationScreen';
import TeamScreen from './components/TeamScreen';
import ProjectGuide from './components/ProjectGuide';
import Crytography from './components/Crytography';
import ClassicalEncryptionScreen from './components/ClassicalEncryptionScreen';
import ModernEncryptionScreen from './components/ModernEncryptionScreen';
import FeedbackScreen from './components/FeedbackScreen';
import TranslateScreen from './components/TranslatorScreen';
import FAQComponent from './components/FAQComponent';
import AboutScreen from './components/AboutScreen';
import ContactPage from './components/Contact';
import Sources from './components/Sources';
import HelpScreen from './components/HelpScreen';
import FeedbackDetails from './components/FeedbackDetails';
import UserContext, {UserProvider} from './UserContext';
import SinupScreen from './components/SinupScreen';
import PlayfairCipher from './components/DecryptionScreen';
import CaesarCipher from './components/CaeserCipher';
import MonoalphabeticCipher from './components/MonoAlphabeticCipher';
import PolyalphabeticCipher from './components/PolyAlphabeticCipher';
import RailFenceCipher from './components/RailFence';
import RowColumnTransposition from './components/RowColumnTransposition';
import OneTimePad from './components/OneTimePad';
import SymmetricKey from './components/SymmetricKey';
import AsymmetricKey from './components/AsymmetricKey';
import HashEncryption from './components/HashEncryption';
import HybridEncryption from './components/HybridEncryption';
import Quantum from './components/Quantum';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Notifications') iconName = 'bell';
          if (route.name === 'Team') iconName = 'users';
          if (route.name === 'Profile') iconName = 'user';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: '#f8f8f8', paddingBottom: 5, height: 60},
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen
        name="Team"
        component={TeamScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  const {isLoggedIn} = useContext(UserContext);

  if (isLoggedIn === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SinupScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Project Guide" component={ProjectGuide} />
          <Stack.Screen name="Translator" component={TranslateScreen} />
          <Stack.Screen name="Cryptography" component={Crytography} />
          <Stack.Screen
            name="ClassicalEncryption"
            component={ClassicalEncryptionScreen}
          />
          <Stack.Screen
            name="ModernEncryption"
            component={ModernEncryptionScreen}
          />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen name="FAQ" component={FAQComponent} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Contact" component={ContactPage} />
          <Stack.Screen name="Sources" component={Sources} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="FeedbackDetails" component={FeedbackDetails} />
          <Stack.Screen name="PlayfairCipher" component={PlayfairCipher} />
          <Stack.Screen name="CaeserCipher" component={CaesarCipher} />
          <Stack.Screen
            name="MonoAlphabeticCipher"
            component={MonoalphabeticCipher}
          />
          <Stack.Screen
            name="PolyAlphabetic"
            component={PolyalphabeticCipher}
          />
          <Stack.Screen name="OneTimePad" component={OneTimePad} />
          <Stack.Screen name="RailFence" component={RailFenceCipher} />
          <Stack.Screen
            name="RowColumnTransposition"
            component={RowColumnTransposition}
          />
          <Stack.Screen name="SymmetricKey" component={SymmetricKey} />
          <Stack.Screen name="AsymmetricKey" component={AsymmetricKey} />
          <Stack.Screen name="HashEncryption" component={HashEncryption} />
          <Stack.Screen name="HybridEncryption" component={HybridEncryption} />
          <Stack.Screen name="Quantum" component={Quantum} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    }
  };

  const createNotificationChannel = async () => {
    try {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Notification Channel',
        importance: 4,
      });
      console.log('Notification channel created');
    } catch (error) {
      console.error('Error creating notification channel:', error);
    }
  };

  const displayNotification = async (title, body) => {
    try {
      await notifee.displayNotification({
        title: title || 'Default Title',
        body: body || 'Default Body',
        android: {channelId: 'default'},
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  const handleForegroundNotifications = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground FCM message:', remoteMessage);
      const {title, body} = remoteMessage.notification || {};
      await displayNotification(title, body);
    });
    return unsubscribe;
  };

  const handleBackgroundNotifications = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background FCM message:', remoteMessage);
      const {title, body} = remoteMessage.notification || {};
      await displayNotification(title, body);
    });
  };

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    createNotificationChannel();
    handleForegroundNotifications();
    handleBackgroundNotifications();
    getFCMToken();

    return () => {
      handleForegroundNotifications();
    };
  }, []);

  return (
    <UserProvider>
      <ToastProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </ToastProvider>
    </UserProvider>
  );
};

export default App;
