import { Formik } from 'formik';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import useCreateUser from '../hooks/useCreateUser';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Button from './Button';

const initialValues = {
  username: 'michael2',
  password: 'password',
  passwordConfirm: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  fileld: {
    marginVertical: 10,
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.fileld}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        style={styles.fileld}
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        style={styles.fileld}
      />
      <Button onPress={onSubmit} style={styles.fileld}>
        Sign Up
      </Button>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .max(30, 'max length 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'min length ${min}')
    .max(50, 'max length ${max}'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useCreateUser();

  const onSubmit = async ({ values }) => {
    console.log(values);
    try {
      await createUser(values);
    } catch (error) {
      console.log(error);
      Platform.OS === 'web'
        ? alert(error.message)
        : Alert.alert('Alert', error.message);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit({ values })}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
