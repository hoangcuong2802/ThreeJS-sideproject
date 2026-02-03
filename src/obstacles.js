import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { LANE_WIDTH, FORWARD_SPEED, OBSTACLE_ASSETS } from './constants.js'

export class ObstacleManager {
  constructor(scene) {
    this.scene = scene
    this.obstacles = []
    this.loader = new GLTFLoader()
    this.timer = 0
  }

  spawn() {
    const path = OBSTACLE_ASSETS[Math.floor(Math.random() * OBSTACLE_ASSETS.length)]
    const lane = [-1, 0, 1][Math.floor(Math.random() * 3)]

    this.loader.load(path, (gltf) => {
      const obs = gltf.scene
      obs.position.set(lane * LANE_WIDTH, 0, -20)
      obs.userData.hit = false
      this.scene.add(obs)
      this.obstacles.push(obs)
    })
  }

  update(dt) {
    this.timer += dt
    if (this.timer > 1.2) {
      this.spawn()
      this.timer = 0
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i]
      o.position.z += FORWARD_SPEED * dt
      if (o.position.z > 5) {
        this.scene.remove(o)
        this.obstacles.splice(i, 1)
      }
    }
  }
}
