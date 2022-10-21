export default {
  id: 'fish',
  anchor: require('./fish.png'),
  // source: require('./test.vrx'),
  source: require('./PoissonBonesTest.vrx'),
  // animation: {
  //   // name: 'loggerhead.armature|loggerhead.armature|loggerhead.armature|Armature.loggerheadActi',
  //   name: 'Take 001',
  //   run: true,
  //   loop: true,
  // },
  resources: [
    // require('./textures/loggerhead_8bit_roughness.jpeg'),
    // require('./textures/loggerhead_8bit_normal.jpeg'),
    // require('./textures/loggerhead_8bit_albedo2.png'),
  ],
  //  material: {
  //   lightingModel: "PBR",
  //   DiffuseColor: require('./textures/Spinnen_Bein_tex_COLOR_.jpg'),
  //   transparencyFactor: require('./textures/SH3.png'),
  //   normalMap: require('./textures/haar_detail_NRM.jpg'),
  //   //   // diffuseTexture: require('../tesla/object_car_main_Base_Color.png'),
  //   //   // metalnessTexture: require('../tesla/object_car_main_Metallic.png'),
  //   //   // roughnessTexture: require('../tesla/object_car_main_Roughness.png')
  // },
  type: 'VRX',
};
