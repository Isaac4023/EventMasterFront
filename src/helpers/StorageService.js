import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

class StorageService {
  // Regex validations
  static patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  };

  static validate(type, value) {
    return this.patterns[type]?.test(value) || false;
  }

  // async storage, no sensible
  static async setItem(key, value) {
    try {
      const stringValue =
        typeof value === 'object' ? JSON.stringify(value) : String(value);

      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('AsyncStorage save error:', error);
    }
  }

  static async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error('AsyncStorage get error:', error);
      return null;
    }
  }

  static async removeItem(key) {
    await AsyncStorage.removeItem(key);
  }

  // jwt
  static async saveToken(token) {
    try {
      await SecureStore.setItemAsync('authToken', token);
    } catch (error) {
      console.error('SecureStore save error:', error);
    }
  }

  static async getToken() {
    try {
      return await SecureStore.getItemAsync('authToken');
    } catch (error) {
      console.error('SecureStore get error:', error);
      return null;
    }
  }

  static async deleteToken() {
    await SecureStore.deleteItemAsync('authToken');
  }
}

export default StorageService;