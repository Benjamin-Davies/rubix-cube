import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';
import { render } from 'react-dom';

class Viewport {
  canvas: HTMLCanvasElement;
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  cube: Mesh;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.scene = new Scene();

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera = new PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new WebGLRenderer({ canvas });

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  private animate() {
    requestAnimationFrame(this.animate);

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.animate = () => {};
  }
}

export default Viewport;
