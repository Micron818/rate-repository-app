import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const createView = async (values) => {
    const {
      data: { createReview },
    } = await mutate({
      variables: {
        review: values,
      },
    });

    return createReview;
  };

  return [createView, result];
};

export default useCreateReview;
