import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignout';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <Link style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <Text fontWeight="bold" style={styles.tabText}>
          {children}
        </Text>
      </View>
    </Link>
  );
};

const AppBarSignIn = () => <AppBarTab to="/sign-in">Sign in</AppBarTab>;

const AppBarSignOut = () => {
  const [signOut] = useSignOut();
  return <AppBarTab onPress={signOut}>Sign out</AppBarTab>;
};

const Loading = () => <AppBarTab>Loading</AppBarTab>;

const AppBar = () => {
  const { data, loading } = useMe();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {loading ? (
          <Loading />
        ) : data?.me ? (
          <>
            <AppBarTab to="/createReview">Create a review</AppBarTab>
            <AppBarSignOut />
          </>
        ) : (
          <AppBarSignIn />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
