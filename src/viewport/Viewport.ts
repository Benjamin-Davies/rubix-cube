import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  WebGLRendererParameters,
  Camera
} from 'three';

const rendererParams: WebGLRendererParameters = {
  antialias: true
};

class Viewport {
  canvas: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this.canvas = canvas;
    this.scene = scene;

    this.camera = new Camera(); // To keep the type-checker happy
    this.renderer = new WebGLRenderer({ ...rendererParams, canvas });

    window.addEventListener('resize', this.windowResized);
    this.windowResized();

    requestAnimationFrame(this.draw);
  }

  private windowResized = () => {
    const width = window.innerWidth,
      height = window.innerHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    this.renderer.setViewport(0, 0, width, height);

    this.camera = new PerspectiveCamera(40, width / height, 0.1, 1000);
    this.camera.position.z = 3;
  };

  private draw = () => {
    requestAnimationFrame(this.draw);

    this.renderer.render(this.scene, this.camera);
  };

  destroy() {
    window.removeEventListener('resize', this.windowResized);
    this.draw = () => {};
  }
}

export default Viewport;
