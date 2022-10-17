import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroVideo,
  ViroConstants,
  ViroARSceneNavigator,
} from '@viro-community/react-viro';
import Show from './Pages/ARScreen';
import {NativeBaseProvider} from 'native-base';

export default () => {
  return (
    <NativeBaseProvider>
      <Show />
    </NativeBaseProvider>
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
