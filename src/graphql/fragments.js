import { gql } from '@apollo/client';

const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    userHasReviewed
  }
`;

const PAGE_INFRO = gql`
  fragment PageInfoFields on PageInfo {
    hasPreviousPage
    hasNextPage
    startCursor
    endCursor
  }
`;

const REVIEWS = gql`
  ${PAGE_INFRO}
  fragment ReviewsField on ReviewConnection {
    edges {
      node {
        id
        text
        rating
        createdAt
        user {
          id
          username
        }
      }
      cursor
    }
    pageInfo {
      ...PageInfoFields
    }
  }
`;

const REPOSITORIES = gql`
  ${PAGE_INFRO}
  ${REPOSITORY_FIELDS}
  fragment RepositoryConnection on RepositoryConnection {
    edges {
      cursor
      node {
        ...RepositoryFields
      }
    }
    pageInfo {
      ...PageInfoFields
    }
  }
`;

const REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  fragment Repository on Repository {
    ...RepositoryFields
  }
`;

export { REPOSITORIES, REPOSITORY, REVIEWS };
