import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  ViroAmbientLight,
  ViroAnimations,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import Anchor from '../../Components/Critter/Anchor';
import Critter from '../../Components/Critter';

const EnvironementScene = ({bestiary = []}) => {
  const [playAnim, setPlayAnim] = useState(false);
  const [animName, setAnimName] = useState('scaleUp');
  const [currentCritter, setCurrentCritter] = useState();
  const [currentAnchorId, setCurrentAnchorId] = useState();
  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      // setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_LIMITED) {
      // Handle loss of tracking
    }
  }

  const _onAnchorFound = (a, c) => {
    console.log('FOUD', a, c);
    // setCurrentCritter(c);
    // setAnimName('scaleUp');
    // setPlayAnim(true);
  };

  const _onAnchorUpdated = c => a => {
    // console.log('UPDT', a, c);
    if (a.trackingMethod !== 'tracking') {
      return;
    }
    if (c.id !== currentCritter?.id) {
      console.log('ee');
      setCurrentCritter(c);
      setPlayAnim(true);
    }
  };

  const _toggleButtons = () => {
    setAnimName(cur => (cur === 'scaleUp' ? 'scaleDown' : 'scaleUp')),
      setPlayAnim(true);
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#FFFFFF" />
      {bestiary.map(critter => (
        <Anchor
          key={critter.id}
          id={critter.id}
          critter={critter}
          onAnchorFound={a => _onAnchorFound(a, critter)}
          onAnchorUpdated={_onAnchorUpdated(critter)}>
          <Critter
            critter={critter}
            scale={[0, 0, 0]}
            onClick={_toggleButtons}
            animation={{
              name: critter.id === currentCritter?.id ? 'scaleUp' : 'scaleDown',
              run: playAnim,
            }}
          />
        </Anchor>
      ))}
    </ViroARScene>
  );
};

export default EnvironementScene;
