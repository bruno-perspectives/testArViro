import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef} from 'react';
import Video from './Video';
import Model3D from './Model3D';
import Image from './Image';

const VierwerType = {
  VIDEO: Video,
  IMAGE: Image,
};
const Critter = forwardRef(({critter, ...rest}, ref) => {
  // console.log('c', critter);
  const Viewer = VierwerType[critter.type] ?? Model3D;

  return <Viewer critter={critter} ref={ref} {...rest} />;
});

export default Critter;

const styles = StyleSheet.create({});
