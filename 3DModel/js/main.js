// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(103, window.innerWidth / window.innerHeight, 0.1, 1000);

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Keep the 3D object on a global variable so we can access it later
let object;

// OrbitControls allow the camera to move around the scene
let controls;

// Set the path to your Haouz3D.glb file
const objToRender = "Haouz3D"; // You can keep this or remove it and load your model directly

// Load the file
loader.load(
  `models/${objToRender}.glb`, // Update with the correct path if needed
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = 399; // Adjust based on your model size

// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 15); // Adjust intensity as needed
scene.add(ambientLight);


const additionalLight = new THREE.DirectionalLight(0xffffff, 4); // Increase intensity
additionalLight.position.set(-500, -500, 500); // Adjust position for better lighting
scene.add(additionalLight);


// This adds controls to the camera, so we can rotate/zoom it with the mouse
// Initialize OrbitControls for smoother camera manipulation
controls = new OrbitControls(camera, renderer.domElement);

// Center the camera on the model
controls.target.set(0, 0, 0);

// Enable smoothing and damping
controls.enableDamping = true;      // Enables smooth transitions
controls.dampingFactor = 0.25;      // Adjust smoothness (lower values for smoother movement)

// Set the rotation speed
controls.rotateSpeed = 0.1;         // Adjust the speed of rotation (higher values for faster rotation)

// Set zoom and pan speeds
controls.zoomSpeed = 0.1;           // Adjust zooming speed (higher values for faster zooming)
controls.panSpeed = 0.9;            // Adjust panning speed (higher values for faster panning)

// Limit the zoom distance (optional for better control)
controls.minDistance = 50;          // Minimum zoom distance
controls.maxDistance = 500;         // Maximum zoom distance

// Enable auto-rotation (optional, if you want the model to auto-rotate)
controls.autoRotate = true;         // Use bracket notation for auto-rotate property
controls.autoRotateSpeed = 2.0;     // Speed of auto-rotation (adjust to taste)


// Update the controls to apply changes
controls.update();


function resetCamera() {
  camera.position.set(0, 0, 300);  // Adjust the initial camera position as needed
  controls.target.set(0, 0, 0);  // Set the camera focus back to the model's center
  controls.update();
}


// Render the scene
function animate() {
  requestAnimationFrame(animate);

  // Optional: You can add some automatic rotation or animation for your model here

  renderer.render(scene, camera);
}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the 3D rendering
animate();
