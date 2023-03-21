import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const createUser = async (values) => {
    const {
      data: { createUser },
    } = await mutate({ variables: { user: values } });
    return createUser;
  };
  return [createUser, result];
};
export default useCreateUser;
