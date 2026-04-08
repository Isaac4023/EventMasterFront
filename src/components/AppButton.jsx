import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

export const AppButton = ({ title, onPress, style, loading, disabled }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        style, 
        (disabled || loading) && styles.disabled
      ]} 
      onPress={onPress} 
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} size="small" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 14,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
