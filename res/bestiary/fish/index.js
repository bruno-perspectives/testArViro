export default {
  id: 'fish',
  anchor: require('./fish.png'),
  source: require('./test.vrx'),
  animation: {name: 'Spider_Armature|Attack', run: true, loop: true},
  //   source: require('./BarramundiFish.gltf'),
  resources: [
    require('./textures/haar_detail_NRM.jpg'),
    require('./textures/SH3.png'),
    require('./textures/Spinnen_Bein_tex_2.jpg'),
    require('./textures/Spinnen_Bein_tex_COLOR_.jpg'),
    require('./textures/Spinnen_Bein_tex_COLOR_.png'),
    require('./textures/Spinnen_Bein_tex.jpg'),
  ],
  // material: {
    //   // lightingModel: "PBR",
    // diffuseColor: require('./textures/SH3.png'),
    //  transparencyFactor: require('./textures/SH3.png'),
    //   // diffuseTexture: require('../tesla/object_car_main_Base_Color.png'),
    //   // metalnessTexture: require('../tesla/object_car_main_Metallic.png'),
    //   // roughnessTexture: require('../tesla/object_car_main_Roughness.png')
  // },
  type: 'VRX',
};
