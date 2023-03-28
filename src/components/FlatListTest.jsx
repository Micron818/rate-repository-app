import React, { useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const generateArr = (length) => {
  if (length > 100) return [];
  return Array(length)
    .fill()
    .map((_, index) => ({ id: index + 1 }));
};

const FlatListTest = () => {
  const [listItems, setListItems] = useState(generateArr(3));

  const ItemView = ({ item }) => {
    return (
      <View>
        <Text style={styles.item}>{item.id}</Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={listItems}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(_, index) => index}
          onEndReached={({ distanceFromEnd }) => {
            console.log('onEndReached Called...', distanceFromEnd);
            if (distanceFromEnd > 0) {
              return;
            }
            setListItems(generateArr(listItems.length + 1));
          }}
          onEndReachedThreshold={0.5}
          style={{ border: 'solid red 2px' }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
    border: 'solid blue 2px',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default FlatListTest;
