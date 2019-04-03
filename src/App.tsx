import React from 'react';
import './App.css';
import { useViewport } from './viewport';

function App() {
  const canvasRef = useViewport();

  return (
    <div className="App">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
