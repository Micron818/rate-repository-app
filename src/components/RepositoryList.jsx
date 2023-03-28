import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  const { repositories, loading, error, fetchMore } = useRepositories({
    ...sort,
    searchKeyword,
    first: 8,
  });

  // uncomment the following line, would raise re-render,and loss inputed data in HeaderComponent
  // if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={repositories?.edges}
          keyExtractor={({ cursor }) => cursor}
          renderItem={({ item }) => (
            <RepositoryItem repository={item.node} showOpenLink={false} />
          )}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={
            <RepositoryListHeader
              setSort={setSort}
              setSearchKeyword={setSearchKeyword}
            />
          }
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </Provider>
  );
};

export default RepositoryList;
