import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';

export const AppTextInput = ({ style, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 50,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '100%',
  },
  input: {
    color: colors.text,
    fontSize: 14,
    // fontFamily: 'Open_Sauce_One', // TODO: Load font or match system font
  },
});
