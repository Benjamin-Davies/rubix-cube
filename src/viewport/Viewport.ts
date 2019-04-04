import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  Camera
} from 'three';
import { render } from 'react-dom';

class Viewport {
  canvas: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  cube: Mesh;
  resizeHandler: void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.scene = new Scene();

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera = new Camera();

    this.renderer = new WebGLRenderer({ canvas });

    window.addEventListener('resize', this.windowResized)
    this.windowResized();

    requestAnimationFrame(this.animate);
  }

  private windowResized = () => {
    const width = window.innerWidth, height = window.innerHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    this.renderer.setViewport(0, 0, width, height);

    this.camera = new PerspectiveCamera(
      40,
      width / height,
      0.1,
      1000
    );
    this.camera.position.z = 5;
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    window.removeEventListener('resize', this.windowResized);
    this.animate = () => { };
  }
}

export default Viewport;
