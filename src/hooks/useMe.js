import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const useMe = () => {
  const { data, error, loading } = useQuery(GET_ME);
  return { data, error, loading };
};

export default useMe;
