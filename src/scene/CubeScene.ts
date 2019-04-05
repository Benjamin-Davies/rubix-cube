import { Scene, Object3D } from 'three';
import Cube from './Cube';

class CubeScene extends Scene {
  cube: Object3D;

  constructor() {
    super();

    this.cube = new Cube();
    this.add(this.cube);
  }

  animate() {
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.01;
  }
}

export default CubeScene;
