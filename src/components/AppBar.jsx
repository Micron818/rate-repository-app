import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    backgroundColor: '#24292e',
  },
  text: {
    fontSize: '2em',
    color: 'white',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Repositoris'}</Text>
    </View>
  );
};

export default AppBar;
