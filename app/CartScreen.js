import 'react-native-gesture-handler';

import React, { useEffect, useState } from "react";
import {
  Button, FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableWithoutFeedback
} from "react-native";

const CartItem = ({ item, onPressMinus, onPressPlus, onDelete }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <View style={styles.quantityView}>
      <Button onPress={onPressMinus} title="-" />
      <Text style={styles.itemCountText}>{item.count}</Text>
      <Button onPress={onPressPlus} title="+" />
      <TouchableWithoutFeedback onPress={onDelete}>
        <Image
          style={styles.deleteLogo}
          source={require('../assets/delete-cross-circle.png')}
        />
      </TouchableWithoutFeedback>
    </View>
  </View>
);

const CartScreen = ({ navigation, route }) => {
  const { itemsInCart, totalCount } = route.params;

  const [displayItemsInCart, setDisplayItemsInCart] = useState(Object.values(itemsInCart));

  const [mItemsInCart, setMItemsInCart] = useState(itemsInCart);
  const [mTotalCount, setMTotalCount] = useState(totalCount);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <Button onPress={onGoBack} title="Done" />
      ),
    });
  }, [navigation, mTotalCount]);

  const deleteItem = ( id ) => {
    delete mItemsInCart[id];
    setDisplayItemsInCart(Object.values(mItemsInCart));
  }

  const renderItem = ({ item }) => {
    const onPressMinus = () => {
      if (item.count > 0) {
        item.count -= 1;
        setMTotalCount(mTotalCount-1);
      }

      if (item.count == 0) {
        deleteItem(item.id);
      }
    }

    const onPressPlus = () => {
      item.count += 1;
      setMTotalCount(mTotalCount+1);
    }

    const onDelete = () => {
      setMTotalCount(mTotalCount-item.count);
      deleteItem(item.id);
    }

    return (
      <CartItem
        item={item}
        onPressMinus={onPressMinus}
        onPressPlus={onPressPlus}
        onDelete={onDelete}
      />
    );
  };

  const onGoBack = () => {
    navigation.navigate('Home', { mTotalCount });
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={displayItemsInCart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.footer}>
        Total items: {mTotalCount}
      </Text>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    paddingVertical: 8
  },
  item: {
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#FFAB40',
    borderRadius: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
  },
  quantityView: {
    width: 150,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteLogo: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  itemCountText: {
    fontSize: 18,
  },
  footer: {
    paddingVertical: 8,
    fontSize: 18,
    alignSelf: 'center',
  }
});

export default CartScreen;
