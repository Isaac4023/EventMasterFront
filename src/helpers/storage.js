import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Helpers para gestión de persistencia de datos con soporte para Web.
 * En Móvil usa SecureStore (Keychain/Keystore).
 * En Web usa AsyncStorage (localStorage) como fallback.
 */
const isWeb = Platform.OS === 'web';

export const storage = {
  // --- SECURE STORAGE (JWT / SENSITIVE) ---
  
  saveToken: async (token) => {
    try {
      if (isWeb) {
        await AsyncStorage.setItem('userToken', token);
      } else {
        await SecureStore.setItemAsync('userToken', token);
      }
    } catch (e) {
      console.error('Error saving token', e);
    }
  },

  getToken: async () => {
    try {
      if (isWeb) {
        return await AsyncStorage.getItem('userToken');
      } else {
        return await SecureStore.getItemAsync('userToken');
      }
    } catch (e) {
      return null;
    }
  },

  deleteToken: async () => {
    try {
      if (isWeb) {
        await AsyncStorage.removeItem('userToken');
      } else {
        await SecureStore.deleteItemAsync('userToken');
      }
    } catch (e) {
      console.error('Error deleting token', e);
    }
  },

  saveUserData: async (userData) => {
    try {
      const stringifiedData = JSON.stringify(userData);
      if (isWeb) {
        await AsyncStorage.setItem('userData', stringifiedData);
      } else {
        await SecureStore.setItemAsync('userData', stringifiedData);
      }
    } catch (e) {
      console.error('Error saving user data', e);
    }
  },

  getUserData: async () => {
    try {
      const data = isWeb 
        ? await AsyncStorage.getItem('userData') 
        : await SecureStore.getItemAsync('userData');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  // --- ASYNC STORAGE (OFFLINE CACHE / NON-SENSITIVE) ---

  saveCache: async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving cache [${key}]`, e);
    }
  },

  getCache: async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  clearAll: async () => {
    try {
      if (isWeb) {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
      } else {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
      }
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Error clearing storage', e);
    }
  }
};
