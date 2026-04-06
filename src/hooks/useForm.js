import { useState } from 'react';
import { Alert } from 'react-native';
import StorageService from '../helpers/StorageService';

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    for (let key in values) {
      if (!values[key] || values[key].trim() === '') {
        Alert.alert('Error', 'All fields are required');
        return false;
      }
    }

    if (values.email && !StorageService.validate('email', values.email)) {
      Alert.alert('Error', 'Invalid email format');
      return false;
    }

    if (values.password && !StorageService.validate('password', values.password)) {
      Alert.alert(
        'Error',
        'Password must have 8 characters, 1 uppercase, 1 lowercase and 1 number'
      );
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    validateForm,
    resetForm,
  };
}