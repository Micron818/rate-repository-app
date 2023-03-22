import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeader = () => {
  const [selectedSort, setSelectedSort] = useState();
  const [isPickerFocused, setIsPickerFocused] = useState();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pickerStyles: {
      width: '70%',
      backgroundColor: 'gray',
      color: 'white',
    },
  });

  const sorts = [
    {
      key: 'CREATED_AT_DESC',
      value: { CREATED_AT: 'DESC' },
      label: 'Latest repositories',
    },
    {
      key: 'RATING_AVERAGE_DESC',
      value: { RATING_AVERAGE: 'DESC' },
      label: 'Highest rated repositories',
    },
    {
      key: 'RATING_AVERAGE_ASC',
      value: { RATING_AVERAGE: 'ASC' },
      label: 'Lowest rated repositories',
    },
  ];

  const handleFocus = (focus) => setIsPickerFocused(focus);

  return (
    <View style={styles.container}>
      <Picker
        mode="dialog"
        placeholder="Select an item..."
        prompt="Pick one, just one"
        style={styles.pickerStyles}
        selectedValue={selectedSort}
        onValueChange={(itemValue) => setSelectedSort(itemValue)}
        onBlur={() => handleFocus(false)}
        onFocus={() => handleFocus(true)}
      >
        {sorts.map(({ key, label, value }) => (
          <Picker.Item key={key} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`${item.id}`)}>
          <RepositoryItem repository={item} showOpenLink={false} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ListHeader}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories('ASC', 'RATING_AVERAGE');
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`${item.id}`)}>
          <RepositoryItem repository={item} showOpenLink={false} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ListHeader}
    />
  );
};

export default RepositoryList;
