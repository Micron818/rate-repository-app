import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

const RepositoryListSelectSort = ({ setSort }) => {
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
    alignCenter: {
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.alignCenter}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button mode="text" onPress={openMenu}>
            Select an item...
          </Button>
        }
      >
        {sorts.map(({ key, label, value }) => (
          <Menu.Item key={key} title={label} onPress={() => setSort(value)} />
        ))}
      </Menu>
    </View>
  );
};

export default RepositoryListSelectSort;
