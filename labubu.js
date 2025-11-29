import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './style.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('#bg')
});
renderer.setSize(window.innerWidth, window.innerHeight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new GLTFLoader();
let labubu;
loader.load('./labubu.glb', (gltf) => {
  labubu = gltf.scene;
  labubu.scale.set(5, 5, 5);
  labubu.position.set(4, -5, 8);
  scene.add(labubu);
});

function addStar() {
  const geometry = new THREE.TetrahedronGeometry(3);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

camera.position.z = 15;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  if (labubu) {
    labubu.rotation.y += 0.01;
    labubu.rotation.x += 0.005;
  }

  camera.position.z = 15 + t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  if (labubu) labubu.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
