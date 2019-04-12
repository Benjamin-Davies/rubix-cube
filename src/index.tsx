import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SceneContext } from './scene';
import CubeScene from './scene/CubeScene';
import { CubeState } from './state';

const scene = new CubeScene();
let state = CubeState.initial;
scene.setState(state);

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

setInterval(() => {
  state = state.randomMove();
  scene.setState(state);
}, 500);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
