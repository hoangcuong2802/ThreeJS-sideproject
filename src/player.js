import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { LANE_WIDTH } from './constants.js'

export class Player {
  constructor(scene) {
    this.lane = 0
    this.mesh = null
    this.mixer = null

    const loader = new GLTFLoader()
    loader.load('/assets/player/Jaguar.glb', (gltf) => {
      this.mesh = gltf.scene
      this.mesh.scale.set(0.8, 0.8, 0.8)
      this.mesh.position.set(0, 0, 0)

      // rotation đúng (độ → rad)
      this.mesh.rotation.y = THREE.MathUtils.degToRad(180)

      scene.add(this.mesh)

      // Animation
      if (gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.mesh)
        this.mixer.clipAction(gltf.animations[0]).play()
      }
    })
  }

  setLane(lane) {
  this.lane = lane
}
  update(dt) {
    if (!this.mesh) return

    // Smooth lane movement
    const targetX = this.lane * LANE_WIDTH
    this.mesh.position.x = THREE.MathUtils.lerp(
      this.mesh.position.x,
      targetX,
      0.15
    )

    // Lean khi đổi lane (Temple Run feel)
    this.mesh.rotation.z = -this.mesh.position.x * 0.25

    // Update animation
    if (this.mixer) this.mixer.update(dt)
  }
}
