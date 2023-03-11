import { Pressable, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import { StyleSheet } from 'react-native-web';
import theme from '../theme';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  signIn: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
});

const initialValues = {
  name: '',
  password: '',
};

const SignInForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <View style={styles.container}>
      <FormikTextInput name="name" placeholder="user name" />
      <FormikTextInput name="password" placeholder="password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.signIn}>
        <Text color="white" fontSize="subheading">
          SignIn
        </Text>
      </Pressable>
    </View>
  );
};

const validateSchema = yup.object().shape({
  name: yup
    .string()
    .required('name is required')
    .min(3, 'name length must be greater 3'),
  password: yup
    .string()
    .required('password is required')
    .min(5, 'name length must be greater 5'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
