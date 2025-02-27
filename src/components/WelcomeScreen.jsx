// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import FastImage from 'react-native-fast-image';

// const WelcomeScreen = ({ navigation }) => {
//   const [loginHovered, setLoginHovered] = useState(false);
//   const [signupHovered, setSignupHovered] = useState(false);

//   return (
//     <View style={styles.container}>
//       {/* Full-Screen Background Image */}
//       <FastImage
//         style={StyleSheet.absoluteFillObject} // Makes the image cover the entire screen
//         source={require('../assets/home.jpeg')} // Adjust the path if necessary
//         resizeMode={FastImage.resizeMode.cover}
//       />

//       {/* Content Section */}
//       <View style={styles.content}>
//         {/* Title at Center */}
//         <Text style={styles.title}>HELLO</Text>
//         <Text style={styles.subtitle}>Welcome To Gyansecure</Text>
//       </View>

//       {/* Buttons Section */}
//       <View style={styles.buttonContainer}>
//         {/* Login Button */}
//         <TouchableOpacity
//           style={
//             loginHovered
//               ? [styles.button, styles.buttonHover]
//               : styles.button
//           }
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate('Login')}
//           onPressIn={() => setLoginHovered(true)}
//           onPressOut={() => setLoginHovered(false)}
//         >
//           <Text
//             style={
//               loginHovered
//                 ? [styles.buttonText, styles.buttonTextHover]
//                 : styles.buttonText
//             }
//           >
//             Login
//           </Text>
//         </TouchableOpacity>

//         {/* Signup Button */}
//         <TouchableOpacity
//           style={
//             signupHovered
//               ? [styles.button, styles.buttonHover]
//               : styles.button
//           }
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate('Signup')}
//           onPressIn={() => setSignupHovered(true)}
//           onPressOut={() => setSignupHovered(false)}
//         >
//           <Text
//             style={
//               signupHovered
//                 ? [styles.buttonText, styles.buttonTextHover]
//                 : styles.buttonText
//             }
//           >
//             Sign Up
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center', // Centers content vertically
//     alignItems: 'center', // Centers content horizontally
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     textShadowColor: '#000000',
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 5,
//   },
//   subtitle: {
//     fontSize: 34,
//     fontWeight: '500',
//     color: '#FFFFFF',
//     marginTop: 10,
//     marginBottom: 150,
//     textAlign: 'center',
//     textShadowColor: '#000000',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 3,
//   },
//   buttonContainer: {
//     paddingBottom: 70, // Adjust as needed for spacing from the bottom
//     width: '80%',
//     alignSelf: 'center',
//   },
//   button: {
//     backgroundColor: '#FFFFFF',
//     borderColor: '#0000FF',
//     borderWidth: 2,
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   buttonHover: {
//     backgroundColor: '#0000FF',
//   },
//   buttonText: {
//     color: '#0000FF', // Default text color
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   buttonTextHover: {
//     color: '#FFFFFF', // Hover text color
//   },
// });

// export default WelcomeScreen;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Highlighted Welcome Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.brandName}>GyanSecure</Text>
        <Text style={styles.subtitle}>
          Your trusted solution for encryption & decryption.
        </Text>
        {/* Optional: Add a logo or illustration */}
        <FastImage
       style={styles.image} // Makes the image cover the entire screen
     source={require('../assets/home.jpeg')} // Adjust the path if necessary
       
       />
      </View>

      {/* Bottom Button Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Icon name="login" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Icon name="account-plus" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  brandName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  bottomSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200ea',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 3,
  },
  signupButton: {
    backgroundColor: '#03dac6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});
