import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';
import formatInThousands from '../../utils/formatInThousands';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );
      // debug();

      const repositoryItems = getAllByTestId('repositoryItem');
      // const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      for (let index = 0; index < repositories.edges.length; index++) {
        const {
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount,
        } = repositories.edges[index].node;

        expect(repositoryItems[index]).toHaveTextContent(
          fullName + description + language
        );
        expect(repositoryItems[index]).toHaveTextContent(
          formatInThousands(forksCount)
        );
        expect(repositoryItems[index]).toHaveTextContent(
          formatInThousands(stargazersCount)
        );
        expect(repositoryItems[index]).toHaveTextContent(
          formatInThousands(ratingAverage)
        );
        expect(repositoryItems[index]).toHaveTextContent(
          formatInThousands(reviewCount)
        );
      }
    });
  });
});
