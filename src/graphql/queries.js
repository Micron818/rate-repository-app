import { gql } from '@apollo/client';
import { REPOSITORIES, REPOSITORY, REVIEWS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORIES}
  query repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      ...RepositoryConnection
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY}
  ${REVIEWS}
  query repository(
    $repositoryId: ID!
    $reviewsFirst: Int
    $reviewsAfter: String
  ) {
    repository(id: $repositoryId) {
      ...Repository
      reviews(first: $reviewsFirst, after: $reviewsAfter) {
        ...ReviewsField
      }
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      id
      username
    }
  }
`;
