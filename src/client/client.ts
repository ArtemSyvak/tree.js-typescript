import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'

const scene: THREE.Scene = new THREE.Scene()
scene.background = new THREE.Color('#0d3f67')

const asexHelper: THREE.AxesHelper = new THREE.AxesHelper(5)
scene.add(asexHelper); 

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: '#1ee3cf', wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 2

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()

const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open();

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open();

const animate = function () {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update()

    render()

    stats.update();
};

function render() {
    renderer.render(scene, camera)
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

animate();
