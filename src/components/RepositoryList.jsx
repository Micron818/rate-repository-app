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

const RepositoryList = () => {
  const [sort, setSort] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'ASC',
  });

  const [searchKeyword, setSearchKeyword] = useState('');

  const repositories = useRepositories(sort, searchKeyword);

  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

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
        ListHeaderComponent={
          <RepositoryListHeader
            setSort={setSort}
            setSearchKeyword={setSearchKeyword}
          />
        }
      />
    </Provider>
  );
};

export default RepositoryList;
