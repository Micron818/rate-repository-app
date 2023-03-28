import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

const RepositoryListHeader = ({ setSort, setSearchKeyword }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const sorts = [
    {
      key: 'CREATED_AT_DESC',
      value: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
      label: 'Latest repositories test',
    },
    {
      key: 'RATING_AVERAGE_DESC',
      value: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
      label: 'Highest rated repositories',
    },
    {
      key: 'RATING_AVERAGE_ASC',
      value: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
      label: 'Lowest rated repositories',
    },
  ];

  const styles = StyleSheet.create({
    searchbar: {
      backgroundColor: 'white',
    },
    button: {
      alignItems: 'flex-start',
    },
    buttonLabel: {
      fontWeight: 'bold',
      fontSize: '1rem',
    },
  });

  const [select, setSelect] = useState('Select an item...');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebouncedCallback((query) => {
    setSearchKeyword(query);
  }, 500);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <View>
      <Searchbar
        mode="view"
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            onPress={openMenu}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            {select}
          </Button>
        }
      >
        {sorts.map(({ key, label, value }) => (
          <Menu.Item
            key={key}
            title={label}
            onPress={() => {
              setSelect(label);
              setSort(value);
              closeMenu();
            }}
          />
        ))}
      </Menu>
    </View>
  );
};

export default RepositoryListHeader;
