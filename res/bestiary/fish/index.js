export default {
  id: 'fish',
  anchor: require('./fish.png'),
  source: require('./PoissonBonesTest.vrx'),
  animation: {name: 'Take 001', run: true, loop: true},
  //   source: require('./BarramundiFish.gltf'),
  // resources: [
  //   require('./object_bpanther_Base_Color.png'),
  //   require('./object_bpanther_Metallic.png'),
  //   require('./object_bpanther_Mixed_AO.png'),
  //   require('./object_bpanther_Normal_OpenGL.png'),
  //   require('./object_bpanther_Roughness.png'),
  // ],
  // material: {
  //   lightingModel: "PBR",
  //   diffuseTexture: require('../tesla/object_car_main_Base_Color.png'),
  //   metalnessTexture: require('../tesla/object_car_main_Metallic.png'),
  //   roughnessTexture: require('../tesla/object_car_main_Roughness.png')
  // },
  type: 'VRX',
};
