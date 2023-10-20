import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Pour importer le  importé un chargeur de modele      
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
//On positionne la camera à (0, 0, 100)
camera.position.set( 0, 0, 100 );
//On oriente la camera vers l'origine de la scène en utilisant
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Creation de l'instance OrbitControls après avoir créé la caméra et le rendu.
const controls = new OrbitControls(camera, renderer.domElement);

// Chargeur de modèle GLTFLoader
const loader = new GLTFLoader();


// Crée une lumière ambiante
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Crée une lumière ponctuelle
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Crée un point de référence
const referencePoint = new THREE.Object3D();
scene.add(referencePoint);

// Charge la texture de la Terre
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('textures/2k_terre.jpg');

// Crée la géométrie de la Terre
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);

// Crée le matériau de la Terre avec la texture
const earthMaterial = new THREE.MeshLambertMaterial({ map: earthTexture });

// Crée le maillage de la Terre
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

// Positionne la Terre par rapport au point de référence
earthMesh.position.set(3, 0, 0);

// Ajoute la Terre à la scène
referencePoint.add(earthMesh);

// Fonction pour animer la scène
function animate() {
	requestAnimationFrame(animate);

	// Faites tourner la Terre
	referencePoint.rotation.y += 0.005;

	renderer.render(scene, camera);
}

animate();




