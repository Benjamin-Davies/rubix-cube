import { Scene, Object3D } from 'three';
import Cube from './Cube';
import { CubeState } from '../state';

class CubeScene extends Scene {
  cube: Cube;

  constructor() {
    super();

    this.cube = new Cube();
    this.add(this.cube);
  }

  animate() {
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.01;
  }

  setState(state: CubeState) {
    this.cube.setState(state);
  }
}

export default CubeScene;
