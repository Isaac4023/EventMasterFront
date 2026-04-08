import { StyleSheet, TextInput, View, Text } from 'react-native';
import { colors } from '../theme/colors';

export const AppTextInput = ({ style, error, errorMessage, ...props }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={[
        styles.container, 
        style,
        error && styles.errorBorder
      ]}>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(255,255,255,0.4)"
          {...props}
        />
      </View>
      {error && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    marginVertical: 5,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  errorBorder: {
    borderColor: colors.danger,
  },
  input: {
    color: colors.text,
    fontSize: 14,
  },
  errorText: {
    color: colors.danger,
    fontSize: 10,
    marginTop: 4,
    marginLeft: 12,
    fontWeight: '600',
  },
});
