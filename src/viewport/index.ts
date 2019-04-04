import { useEffect, useState, useContext } from 'react';
import { SceneContext } from "../scene";
import Viewport from './Viewport';

export function useViewport() {
  const [canvas, setCanvas] = useState(null as HTMLCanvasElement | null);

  const scene = useContext(SceneContext);

  useEffect(() => {
    if (canvas !== null && scene !== null) {
      const viewport = new Viewport(canvas, scene);

      return () => {
        viewport.destroy();
      };
    }
  }, [canvas, scene]);

  return setCanvas;
}
