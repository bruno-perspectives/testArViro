import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ViroARImageMarker} from '@viro-community/react-viro';

const Anchor = ({critter, selected, children, ...rest}) => {
  console.log(('s', selected))
  return (
    <ViroARImageMarker target={selected ? null : critter.id} {...rest}>
      {children}
    </ViroARImageMarker>
  );
};

export default Anchor;

const styles = StyleSheet.create({});
