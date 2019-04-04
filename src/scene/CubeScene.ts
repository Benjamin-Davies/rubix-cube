import { Scene, BoxGeometry, MeshNormalMaterial, Mesh } from "three";

class CubeScene extends Scene {
  box: Mesh;

  constructor() {
    super();

    const geometry = new BoxGeometry();
    const material = new MeshNormalMaterial();
    this.box = new Mesh(geometry, material);
    this.add(this.box);
  }

  animate() {
    this.box.rotation.x += 0.01;
    this.box.rotation.y += 0.01;
  }
}

export default CubeScene;