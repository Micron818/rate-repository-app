import { format, parseISO } from 'date-fns';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  rating: {
    marginRight: 20,
    padding: 10,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 3,
    aspectRatio: 1,
    borderRadius: '50%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    flexGrow: 1,
    paddingVertical: 15,
  },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repository={repository} showOpenLink={true} />;
};

const ReviewItem = ({ review: { node } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={{
            color: theme.colors.primary,
          }}
        >
          {node.rating}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {node.user.username}
        </Text>
        <Text style={styles.createdAt} color="textSecondary">
          {format(parseISO(node.createdAt), 'dd-MM-yyyy')}
        </Text>
        <Text style={styles.text}>{node.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error, fetchMore } = useRepository({
    repositoryId: id,
    reviewsFirst: 3,
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const reviews = repository?.reviews?.edges;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ node: { id } }) => id}
      ListHeaderComponent={<RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
