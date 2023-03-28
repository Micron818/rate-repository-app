import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  });
  const repository = data?.repository;

  const handleFetchMore = () => {
    const canFetchMore = !loading && repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        reviewsAfter: repository?.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repository, error, loading, fetchMore: handleFetchMore };
};

export default useRepository;
