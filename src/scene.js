import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function createScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x87ceeb)

  const camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 0.1, 100
  )
  camera.position.set(0, 2.5, 5)
  camera.lookAt(0, 1, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const dir = new THREE.DirectionalLight(0xffffff, 1)
  dir.position.set(5, 10, 5)
  scene.add(dir)

  // Ground
  const loader = new GLTFLoader()
  loader.load('/assets/ground/TortoiseRescue_Ground.glb', (gltf) => {
    const ground = gltf.scene
    ground.position.y = -0.5
    scene.add(ground)
  })

  return { scene, camera, renderer }
}
