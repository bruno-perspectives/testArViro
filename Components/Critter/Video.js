import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Viro360Video, ViroNode, ViroVideo} from '@viro-community/react-viro';
import v from '../../res/testVideo.mp4';

const Video = ({critter, ...rest}) => {
  return (
    // <ViroNode position={[0, 0, 0]} width={100} height={100}>
      <ViroVideo
        source={critter.source}
        loop={true}
        // position={[0, 2, -5]}
        // scale={[2, 2, 0]}
       {...rest}
      />
    // </ViroNode>
  );
};

export default Video;

const styles = StyleSheet.create({});
