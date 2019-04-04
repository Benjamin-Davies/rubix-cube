import { createContext } from "react";
import { Scene } from "three";

export const SceneContext = createContext<Scene | null>(null);