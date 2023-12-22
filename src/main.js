import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';

const fileUrl = new URL('../assets/GLTF/Fox.gltf', import.meta.url);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(10, 10, 10);
orbit.update();
// grid
const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

// directional light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(directionalLight);
directionalLight.position.set(10, 11, 7);

//ambient light
const ambientLight = new THREE.AmbientLight(0xededed, 5);
scene.add(ambientLight);

//gui
const gui = new dat.GUI();

// options for gui
const options = {
    'Main light' : 0x7C7C7C,
    'Main' : 0x9289D1,
    'Black' : 0x1889D1
}

//gtf loader codes

const assetLoader = new GLTFLoader();

assetLoader.load(fileUrl.href, function(gltf) {
        const model = gltf.scene;
        scene.add(model);
        gui.addColor(options, 'Main light').onChange(function(e){
            model.getObjectByName('Cube_4').material.color.setHex(e);
        });
        gui.addColor(options, 'Main').onChange(function(e){
            model.getObjectByName('Cube').material.color.setHex(e);
        });
        gui.addColor(options, 'Black').onChange(function(e){
            model.getObjectByName('Cube_1').material.color.setHex(e);
        })
    } , undefined , function(error) {
        console.error(error);
    }
);

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
};

animate();
//window resize
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
} );