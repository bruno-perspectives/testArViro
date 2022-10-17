import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import bestiary from '../res/bestiary';
import {
  ViroAmbientLight,
  ViroAnimations,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import {Fab, Icon} from 'native-base';
import Anchor from '../Components/Critter/Anchor';
import Critter from '../Components/Critter';
import EnvironementScene from './Scenes/Environement';
import CritterScene from './Scenes/Critter';

ViroMaterials.createMaterials(
  bestiary
    .filter(b => b.material)
    .reduce(
      (acc, cur) => ({
        ...acc,
        [cur.id]: cur.material,
      }),
      {},
    ),
);

ViroARTrackingTargets.createTargets(
  bestiary.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: {
        id: cur.name,
        source: cur.anchor,
        orientation: 'Up',
        physicalWidth: 0.01, // real world width in meters
      },
    }),
    {},
  ),
);
ViroAnimations.registerAnimations({
  scaleUp: {
    properties: {scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09},
    duration: 500,
    easing: 'bounce',
  },
  scaleDown: {
    properties: {scaleX: 0, scaleY: 0, scaleZ: 0},
    duration: 500,
    easing: 'bounce',
  },
});

const Show = () => {
  const navRef = useRef();

  return (
    <>
      <ViroARSceneNavigator
        ref={navRef}
        autofocus={true}
        initialScene={{
          scene: EnvironementScene,
          passProps: {bestiary: bestiary},
        }}
        // initialScene={{
        //   scene: CritterScene,
        //   passProps: {critter: bestiary[0]},
        // }}
        style={styles.f1}
      />
    </>
  );
};

export default Show;

const styles = StyleSheet.create({});
