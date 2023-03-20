import { gql } from '@apollo/client';

export const ACCESS_TOKEN = gql`
  mutation AccessToken($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
`;
