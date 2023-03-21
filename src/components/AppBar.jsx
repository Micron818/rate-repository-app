import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';

import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignout';
import theme from '../theme';
import Text from './Text';

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

const Loading = () => <AppBarTab>Loading</AppBarTab>;

const AppBar = () => {
  const [signOut] = useSignOut();
  const { data, loading } = useMe();
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me && <AppBarTab to="createReview">Create a review</AppBarTab>}
        {data?.me && <AppBarTab onPress={signOut}>Sign Out</AppBarTab>}
        {!data?.me && <AppBarTab to="signIn">Sign In</AppBarTab>}
        {!data?.me && <AppBarTab to="signOn">Sign On</AppBarTab>}
      </ScrollView>
    </View>
  );
};

export default AppBar;
