import React, { useState } from "react";
import { Button, Text, StyleSheet, StatusBar, View } from "react-native";

import Constants from "expo-constants";

const AppTest = () => {
  // const styleTypes = ['default','dark-content', 'light-content'];
  // const [visibleStatusBar, setVisibleStatusBar] = useState(false);
  // const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);
  //
  // const changeVisibilityStatusBar = () => {
  //   setVisibleStatusBar(!visibleStatusBar);
  // };
  //
  // const changeStyleStatusBar = () => {
  //   const styleId = styleTypes.indexOf(styleStatusBar) + 1;
  //
  //   if(styleId === styleTypes.length){
  //     return setStyleStatusBar(styleTypes[0]);
  //   }
  //   return setStyleStatusBar(styleTypes[styleId]);
  // };

  return (
    <View style={styles.container}>

      <StatusBar/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ECF0F1',
    padding: 8
  },
  buttonContainer:{
    padding: 10
  },
  textStyle:{
    textAlign: 'center'
  }
});

export default AppTest;
