import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FORWARD_SPEED } from './constants.js'

export class GroundManager {
  constructor(scene) {
    this.scene = scene
    this.segments = []
    this.segmentLength = 20
    this.loader = new GLTFLoader()

    for (let i = 0; i < 3; i++) {
      this.spawn(-i * this.segmentLength)
    }
  }

  spawn(z) {
    this.loader.load('/assets/ground/TortoiseRescue_Ground.glb', (gltf) => {
      const g = gltf.scene
      g.position.z = z
      this.scene.add(g)
      this.segments.push(g)
    })
  }

  update(dt) {
    for (const g of this.segments) {
      g.position.z += FORWARD_SPEED * dt
      if (g.position.z > 10) {
        g.position.z -= this.segmentLength * this.segments.length
      }
    }
  }
}
