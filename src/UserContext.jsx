import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the token in AsyncStorage on mount
  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken'); // Retrieve the token
        setIsLoggedIn(!!token); // Update isLoggedIn based on the token's presence
      } catch (error) {
        console.error('Error checking auth token:', error);
      }
    };

    checkAuthToken();
  }, []); // Run only once on component mount

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
