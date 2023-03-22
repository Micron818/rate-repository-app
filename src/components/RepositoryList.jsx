import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import { useState } from 'react';
import theme from '../theme';

const ItemSeparator = () => {
  return (
    <View
      style={{
        height: 10,
      }}
    />
  );
};

const ListHeader = () => {
  const [selectedSort, setSelectedSort] = useState();
  const pickerStyle = StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    item: {
      color: 'red',
      padding: 15,
      fontSize: theme.fontSizes.subheading,
    },
  });

  const sorts = [
    {
      key: 'CREATED_AT_DESC',
      value: { CREATED_AT: 'DESC' },
      label: 'Latest repositories test',
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

  const [value, setValue] = useState('key1');
  return (
    <Picker
      // mode="dialog"
      // placeholder="Select an item..."
      // style={pickerStyle.container}
      // itemStyle={pickerStyle.item}
      // selectedValue={selectedSort}
      // onValueChange={(itemValue) => setSelectedSort(itemValue)}

      testID="styled-picker"
      selectedValue={value}
      onValueChange={(v) => setValue(v)}
      accessibilityLabel="Styled Picker Accessibility Label"
    >
      <Picker.Item
        label="Sin"
        value="key0"
        style={{ backgroundColor: 'cyan', color: 'red' }}
      />
      <Picker.Item
        label="Cos"
        value="key1"
        color="green"
        style={{ backgroundColor: 'cyan', fontSize: 36 }}
      />
      <Picker.Item
        label="Tan"
        value="key2"
        style={{ backgroundColor: 'blue', fontFamily: 'serif', color: 'white' }}
      />
      {/* {sorts.map(({ key, label, value }) => (
        <Picker.Item key={key} label={label} value={value} />
      ))} */}
    </Picker>
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

export default ListHeader;
