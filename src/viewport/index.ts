import { useEffect, useState } from 'react';
import Viewport from './Viewport';

export function useViewport() {
  const [canvas, setCanvas] = useState(null as HTMLCanvasElement | null);

  useEffect(() => {
    if (canvas !== null) {
      const viewport = new Viewport(canvas);

      return () => {
        viewport.destroy();
      };
    }
  }, [canvas]);

  return setCanvas;
}
