import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const getRepositoryListHeader = (setSort, setSearchKeyword) => (
  <RepositoryListHeader setSort={setSort} setSearchKeyword={setSearchKeyword} />
);

const RepositoryList = () => {
  const [sort, setSort] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'ASC',
  });

  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');

  const { repositories, fetchMore, loading } = useRepositories({
    ...sort,
    searchKeyword,
    first: 8,
  });

  if (loading) return <>Loading...</>;

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    console.log('you are reached the end of the list');
    fetchMore();
  };

  return (
    <Provider>
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`${item.id}`)}>
            <RepositoryItem repository={item} showOpenLink={false} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        // ListHeaderComponent={getRepositoryListHeader(setSort, setSearchKeyword)}
        ListHeaderComponent={
          <RepositoryListHeader
            setSort={setSort}
            setSearchKeyword={setSearchKeyword}
          />
        }
        // onEndReached={onEndReach}
        // onEndReachedThreshold={0.5}
      />
    </Provider>
  );
};

export default RepositoryList;
