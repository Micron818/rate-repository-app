import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderDirection, orderBy) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderDirection, orderBy },
  });
  const repositories = data?.repositories;
  return { repositories, error, loading };
};

export default useRepositories;
