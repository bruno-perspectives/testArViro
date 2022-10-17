export default {
  id: 'tesla',
  anchor: require('./tesla.png'),
  source: require('./object_car.obj'),
  resources: [
    require('./object_car.mtl'),
  ],
  material: {
    lightingModel: "PBR",
    diffuseTexture: require('./object_car_main_Base_Color.png'),
    metalnessTexture: require('./object_car_main_Metallic.png'),
    roughnessTexture: require('./object_car_main_Roughness.png')
  },
  type: 'OBJ',
}