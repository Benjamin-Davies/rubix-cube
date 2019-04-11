import { executeMove, Move } from './move';

export enum CubeFaces {
  Back = 0,
  Front = 1,
  Down = 2,
  Up = 3,
  Left = 4,
  Right = 5
}

export class CubeState {
  constructor(public readonly faces: FaceState[]) {}

  withMove(move: Move) {
    return executeMove(this, move);
  }

  static initial = Array(6)
    .fill(null)
    .map((_, i) => FaceState.singleColor(i));
}

export class FaceState {
  constructor(public readonly subFaceColors: CubeFaces[]) {}

  getSubFaceColor(x: number, y: number) {
    const index = 4 + x + y * 3;
    return this.subFaceColors[index];
  }

  static singleColor(color: CubeFaces) {
    return new FaceState(Array(9).fill(color));
  }
}