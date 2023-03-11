import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const TextInput = ({ style, error, ...props }) => {
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 5,
      borderColor: error ? theme.colors.alertRed : theme.colors.borderColor,
      borderStyle: 'solid',
      borderWidth: '2px',
      borderRadius: 5,
      padding: 10,
    },
  });

  const textInputStyle = [style, styles.input];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
