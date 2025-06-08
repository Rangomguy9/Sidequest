// context/UserDetailContext.js
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);

  // Load from AsyncStorage on first render
  useEffect(() => {
    const loadUserDetail = async () => {
      try {
        const saved = await AsyncStorage.getItem('userDetail');
        if (saved) {
          setUserDetail(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      }
    };
    loadUserDetail();
  }, []);

  // Save to AsyncStorage when userDetail changes
  useEffect(() => {
    const saveUserDetail = async () => {
      if (userDetail) {
        try {
          await AsyncStorage.setItem('userDetail', JSON.stringify(userDetail));
        } catch (e) {
          console.error("Failed to save user to storage", e);
        }
      }
    };
    saveUserDetail();
  }, [userDetail]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};
