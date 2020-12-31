import 'react-native-gesture-handler';

import DATA from "./data";
import React, { useEffect, useState } from "react";
import {
  Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, StatusBar
} from "react-native";

const Item = ({ item, onAddItem }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Button style={styles.button} onPress={onAddItem} title="Add to cart"/>
  </View>
);

const HomeScreen = ({ navigation, route }) => {
  const [itemsInCart, setItemsInCart] = useState({});
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (route.params?.mTotalCount !== undefined) {
      setTotalCount(route.params.mTotalCount);
    }
  }, [route.params?.mTotalCount]);

  useEffect(() => {
    navigation.setOptions({
      title: 'HangryGroup',
      headerRight: () => (
        <TouchableWithoutFeedback onPress={openShopCart}>
          <View style={styles.cartView}>
            <Image
              style={styles.cartLogo}
              source={require('../assets/shopping-cart.png')}
            />
            <Text style={styles.itemsCount}>{totalCount}</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation, totalCount]);

  const onAddItem = (item) => {
    if (item.id in itemsInCart) {
      itemsInCart[item.id].count += 1;
    } else {
      itemsInCart[item.id] = {
        id: item.id,
        title: item.title,
        count: 1
      }
    }
    setItemsInCart(itemsInCart);
    setTotalCount(totalCount+1);
  }

  const onClearCart = () => {
    setItemsInCart({});
    setTotalCount(0);
  }

  const openShopCart = () => {
    navigation.navigate('Cart', { itemsInCart, totalCount });
  }

  const renderItem = ({ item }) => {
    return (
      <Item item={item} onAddItem={() => onAddItem(item)}/>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        style={styles.flatList}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button onPress={onClearCart} title="Clear Cart" />
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
  cartView: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10
  },
  cartLogo: {
    height: 24,
    width: 24,
  },
  itemsCount: {
    paddingLeft: 10
  },
});

export default HomeScreen;
