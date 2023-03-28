import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import theme from '../theme';
import AppBar from './AppBar';
import CreateReview from './CreateReview';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    // <FlatListTest />
    // <RepositoryList />

    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path=":id" element={<SingleRepository />} exact />
        <Route path="createReview" element={<CreateReview />} exact />
        <Route path="signIn" element={<SignIn />} exact />
        <Route path="signOn" element={<SignUp />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
