import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SceneContext } from './scene';
import CubeScene from './scene/CubeScene';

const scene = new CubeScene();

ReactDOM.render(
  <SceneContext.Provider value={scene}>
    <App />
  </SceneContext.Provider>,
  document.getElementById('root')
);

function animate() {
  requestAnimationFrame(animate);

  scene.animate();
}
animate();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
