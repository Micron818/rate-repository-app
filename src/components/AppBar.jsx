import Constants from 'expo-constants';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },

  text: {
    fontSize: '2em',
    color: 'white',
    paddingHorizontal: 5,
    // backgroundColor: theme.colors.primary,
    // border: '5px solid #e1e4e8',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollViewStyle}>
        <Link to="/respository">
          <Text style={styles.text}>Repositoris</Text>
        </Link>
        <Link to="/">
          <Text style={styles.text}>SignIn</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
