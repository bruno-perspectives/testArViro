import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Critter from '../../Components/Critter';
import {
  ViroAmbientLight,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroARScene,
  ViroBox,
  ViroButton,
  ViroController,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Fab, Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CritterScene = ({
  critter,
  arSceneNavigator,
  yOffset = 0,
  onLoadStart,
  onLoadEnd,
}) => {
  const modelRef = useRef();
  const spotRef = useRef();
  const nodeRef = useRef();
  const sceneRef = useRef();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0.2, 0.2, 0.2]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [shouldBillboard, setShouldBillboard] = useState(true);

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      // setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_LIMITED) {
      // Handle loss of tracking
    }
  }
  console.log(critter);
  /*
   Rotation should be relative to its current rotation *not* set to the absolute
   value of the given rotationFactor.
   */
  const _onRotate = (rotateState, rotationFactor, source) => {
    console.log('rotate', rotateState, rotationFactor, source);
    if (rotateState === 3) {
      setRotation(cur => [cur[0], cur[1] + rotationFactor, cur[2]]);
      return;
    }

    nodeRef.current.setNativeProps({
      rotation: [rotation[0], rotation[1] + rotationFactor, rotation[2]],
    });
  };
  /*
   Pinch scaling should be relative to its last value *not* the absolute value of the
   scale factor. So while the pinching is ongoing set scale through setNativeProps
   and multiply the state by that factor. At the end of a pinch event, set the state
   to the final value and store it in state.
   */
  const _onPinch = (pinchState, scaleFactor, source) => {
    console.log('pich', pinchState, scaleFactor, source);
    var newScale = scale.map(x => {
      return x * scaleFactor;
    });

    if (pinchState === 3) {
      setScale(newScale);
      return;
    }

    nodeRef.current.setNativeProps({scale: newScale});
    spotRef.current.setNativeProps({shadowFarZ: 6 * newScale[0]});
  };

  let transformBehaviors = {};
  if (shouldBillboard) {
    // transformBehaviors.transformBehaviors = shouldBillboard ? 'billboardY' : [];
  }

  const _onLoadStart = () => {
    console.log('loadStart');
    setShouldBillboard(true);
    if (onLoadStart) {
      onLoadStart();
    }
  };
  // Perform a hit test on load end to display object.

  const _onLoadEnd = () => {
    console.log('loadEd');
    sceneRef.current.getCameraOrientationAsync().then(orientation => {
      console.log(orientation);
      sceneRef.current
        .performARHitTestWithRay(orientation.forward)
        .then(results => {
          _onArHitTestResults(
            orientation.position,
            orientation.forward,
            results,
          );
        });
    });
    if (onLoadEnd) {
      onLoadEnd();
    }
  };

  const _distance = (vectorOne, vectorTwo) => {
    var distance = Math.sqrt(
      (vectorTwo[0] - vectorOne[0]) * (vectorTwo[0] - vectorOne[0]) +
        (vectorTwo[1] - vectorOne[1]) * (vectorTwo[1] - vectorOne[1]) +
        (vectorTwo[2] - vectorOne[2]) * (vectorTwo[2] - vectorOne[2]),
    );
    return distance;
  };

  const _onArHitTestResults = (position, forward, results) => {
    console.log('_onArHitTestResults', position, forward, results);
    // Default position is just 1.5 meters in front of the user.
    let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];
    let hitResultPosition;

    // Filter the hit test results based on the position.
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        let result = results[i];
        if (result.type === 'ExistingPlaneUsingExtent') {
          var distance = Math.sqrt(
            (result.transform.position[0] - position[0]) *
              (result.transform.position[0] - position[0]) +
              (result.transform.position[1] - position[1]) *
                (result.transform.position[1] - position[1]) +
              (result.transform.position[2] - position[2]) *
                (result.transform.position[2] - position[2]),
          );
          if (distance > 0.2 && distance < 10) {
            // If we found a plane greater than .2 and less than 10 meters away then choose it!
            hitResultPosition = result.transform.position;
            break;
          }
        } else if (result.type === 'FeaturePoint' && !hitResultPosition) {
          // If we haven't found a plane and this feature point is within range, then we'll use it
          // as the initial display point.
          var distance = _distance(position, result.transform.position);
          if (distance > 0.2 && distance < 10) {
            hitResultPosition = result.transform.position;
          }
        }
      }
    }

    if (hitResultPosition) {
      newPosition = hitResultPosition;
    }

    // Set the initial placement of the object using new position from the hit test.
    _setInitialPlacement(newPosition);
  };

  const _setInitialPlacement = pos => {
    setPosition(pos);
    setTimeout(() => {
      _updateInitialRotation();
    }, 200);
  };

  // Update the rotation of the object to face the user after it's positioned.
  const _updateInitialRotation = () => {
    nodeRef.current.getTransformAsync().then(retDict => {
      let rot = retDict.rotation;
      let absX = Math.abs(rot[0]);
      let absZ = Math.abs(rot[2]);

      let yRotation = rot[1];

      // If the X and Z aren't 0, then adjust the y rotation.
      if (absX > 1 && absZ > 1) {
        yRotation = 180 - yRotation;
      }

      setRotation([0, yRotation, 0]);
      setShouldBillboard(false);
    });
  };

  const takeSapshot = () => {
    console.log('aa', navRef.current)
    navRef.current.takeScreenshot('sap', true);
  }

  const _anchorFound = a => {
    console.log(a);
  };
  return (
    <ViroARScene
      ref={sceneRef}
      onTrackingUpdated={onInitialized}
      anchorDetectionTypes="PlanesHorizontal"
      minHeight={0.22}
      minWidth={0.22}
      onPinch={console.log}
      onRotate={console.log}>
      {/* <ViroARPlane minHeight={0.5} minWidth={0.5} alignment={'Horizontal'}>
        <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} />
      </ViroARPlane> */}

      {/* <ViroARPlaneSelector
        minHeight={0.22}
        minWidth={0.22}
        type="Horizontal"
        onPlaneSelected={() => _anchorFound}> */}
      <ViroAmbientLight color="#ffffff" intensity={200} />
      <ViroNode
        {...transformBehaviors}
        visible
        position={position}
        onDrag={() => {}}
        ref={nodeRef}
        scale={scale}
        rotation={rotation}
        dragType="FixedToWorld"
        key={critter.id}
        onRotate={_onRotate}
        onPinch={_onPinch}>
        <ViroSpotLight
          innerAngle={5}
          outerAngle={20}
          direction={[0, -1, 0]}
          position={[0, 4, 0]}
          color="#ffffff"
          castsShadow={true}
          shadowNearZ={0.1}
          shadowFarZ={6}
          shadowOpacity={0.9}
          ref={spotRef}
        />
        <Critter
          ref={modelRef}
          critter={critter}
          scale={[0.1, 0.1, 0.1]}
          position={[0, yOffset, 0]}
          // onRotate={_onRotate}
          // onPinch={_onPinch}
          // onLoadEnd={_onLoadEnd}
          // onLoadStart={_onLoadStart}
        />
        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={2.5}
          height={2.5}
          arShadowReceiver={true}
          ignoreEventHandling={true}
        />
      </ViroNode>
      {/* </ViroARPlaneSelector> */}
      <Fab
        icon={
          <Icon
            color="white"
            as={MaterialCommunityIcons}
            name="cellphone-screenshot"
            size="4"
          />
        }
        onPress={takeSapshot}
      />
    </ViroARScene>
  );
};

export default CritterScene;

const styles = StyleSheet.create({});
