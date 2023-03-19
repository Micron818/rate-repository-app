import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: repositoryId,
  });
  const repository = data?.repository;
  return { repository, error, loading };
};

export default useRepository;
