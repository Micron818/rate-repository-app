import { gql } from '@apollo/client';

export const ACCESS_TOKEN = gql`
  mutation AccessToken($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
