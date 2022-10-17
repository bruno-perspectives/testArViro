import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef} from 'react';
import {Viro3DObject, ViroVideo} from '@viro-community/react-viro';

const Model3D = forwardRef(({critter, ...rest}, ref) => {
  return (
    <Viro3DObject
      // scale={[0, 0, 0]}
      source={critter.source}
      resources={critter.resources}
      type={critter.type}
      ref={ref}
      {...rest}
      position={[0, -1.45, 0]}
      scale={[0.9, 0.9, 0.9]}
      materials={critter.material ? critter.id : null}
      animation={critter.animation ? {...critter.animation} : null}
      // onClick={_toggleButtons}
      // animation={{name: animName, run: playAnim}}
    />
  );
});

export default Model3D;

const styles = StyleSheet.create({});
