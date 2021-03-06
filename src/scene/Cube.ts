import {
  Mesh,
  Object3D,
  Vector3,
  MeshBasicMaterial,
  PlaneGeometry,
  Quaternion
} from 'three';
import { CubeState, FaceState } from '../state';

const unitZ = new Vector3(0, 0, 1);
const faceNormals = [
  new Vector3(0, 0, -1),
  new Vector3(0, 0, 1),
  new Vector3(0, -1, 0),
  new Vector3(0, 1, 0),
  new Vector3(-1, 0, 0),
  new Vector3(1, 0, 0)
];
const facePositions = faceNormals.map(normal =>
  new Vector3().copy(normal).multiplyScalar(0.5)
);
const faceRotations = faceNormals.map(normal =>
  new Quaternion().setFromUnitVectors(unitZ, normal)
);

class Cube extends Object3D {
  faces: CubeFace[];

  constructor() {
    super();

    this.faces = [];
    for (let i = 0; i < 6; i++) {
      const face = new CubeFace(i);
      face.position.copy(facePositions[i]);
      face.quaternion.copy(faceRotations[i]);
      this.faces.push(face);
    }

    this.add(...this.faces);
  }

  setState(state: CubeState) {
    state.faces.forEach((faceState, i) => {
      this.faces[i].setState(faceState);
    });
  }
}

const planeGeometry = new PlaneGeometry();
const cubeMaterials = [
  0xff0000,
  0xffbb00,
  0xffff00,
  0xffffff,
  0x0000ff,
  0x00bb33
].map(color => new MeshBasicMaterial({ color }));
const faceScale = 1 / 3;

class CubeFace extends Object3D {
  subFaces: Mesh[] = [];

  constructor(public centerColor: number) {
    super();

    this.scale.setScalar(faceScale);

    const material = cubeMaterials[centerColor];
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        const mesh = new Mesh(planeGeometry, material);
        mesh.position.set(x, y, 0);
        this.subFaces.push(mesh);
      }
    }
    this.add(...this.subFaces);
  }

  setState(state: FaceState) {
    state.subFaceColors.forEach((color, i) => {
      this.subFaces[i].material = cubeMaterials[color];
    });
  }
}

export default Cube;
