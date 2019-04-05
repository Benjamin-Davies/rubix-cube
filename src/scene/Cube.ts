import {
  Mesh,
  Object3D,
  Vector3,
  MeshBasicMaterial,
  PlaneGeometry,
  Euler,
  Quaternion
} from 'three';

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
}

const planeGeometry = new PlaneGeometry();
const cubeMaterials = [
  0xff0000,
  0xff7700,
  0xffff00,
  0xffffff,
  0x0000ff,
  0x00ff77
].map(color => new MeshBasicMaterial({ color }));

class CubeFace extends Object3D {
  centerColor: number;
  mesh: Mesh;

  constructor(centerColor: number) {
    super();

    this.centerColor = centerColor;

    const material = cubeMaterials[centerColor];
    this.mesh = new Mesh(planeGeometry, material);
    this.add(this.mesh);
  }
}

export default Cube;
