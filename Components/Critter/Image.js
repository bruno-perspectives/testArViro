import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ViroImage, ViroVideo} from '@viro-community/react-viro';

const Image = ({critter, ...rest}) => {
  return (
    <ViroImage
      // height={2}
      // width={2}
      // placeholderSource={require("./res/local_spinner.jpg")}
      source={critter.source}
      {...rest}
    />
  );
};

export default Image;

const styles = StyleSheet.create({});
