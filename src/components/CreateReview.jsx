import { Formik } from 'formik';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import Button from './Button';
import FormikTextInput from './FormikTextInput';

const CreateReview = () => {
  const [createView] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const { repositoryId } = await createView(values);
      navigate(`/${repositoryId}`);
    } catch (error) {
      console.log(error);
      if ('User has already reviewed this repository'.match(error.message)) {
        actions.setErrors({
          ownerName: 'ownerName duplicate',
          repositoryName: 'repositoryName duplicate',
        });
        actions.setSubmitting(false);
      }
      Platform.OS === 'web'
        ? alert(error.message)
        : Alert.alert('Alert', error.message);
    }
  };
  return <CreateReviewContainer onSubmit={onSubmit} />;
};

const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        return onSubmit(
          { ...values, rating: parseInt(values.rating) },
          actions
        );
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return <CreateReviewForm onSubmit={handleSubmit} />;
      }}
    </Formik>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .integer('must be integer')
    .min(0, 'min value 0')
    .max(100, 'max value 100'),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
        style={styles.fieldContainer}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        style={styles.fieldContainer}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        style={styles.fieldContainer}
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        multiline
        numberOfLines={4}
        style={styles.fieldContainer}
      />
      <Button onPress={onSubmit} style={styles.fieldContainer}>
        Create a review
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  fieldContainer: {
    marginTop: 15,
  },
});

const initialValues = {
  ownerName: 'jaredpalmer',
  repositoryName: 'formik',
  rating: 99,
  text: 'demo1',
};

export default CreateReview;
