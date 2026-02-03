import * as THREE from 'three'
import { createScene } from './scene.js'
import { Player } from './player.js'
import { ObstacleManager } from './obstacles.js'
import { isColliding } from './collision.js'
import { HeadController } from './headControl.js'
import { ProgressTracker } from './progress.js'
import { UI } from './ui.js'
import { KeyboardController } from './keyboardControl.js'
import { WebcamHeadController } from './webcamHeadControl.js'

const { scene, camera, renderer } = createScene()
const player = new Player(scene)
const obstacles = new ObstacleManager(scene)
const progress = new ProgressTracker()
const ui = new UI()




const tracker = new WebcamHeadController((offset) => {
  if (offset > 0.25) player.setLane(1)
  else if (offset < -0.25) player.setLane(-1)
  else player.setLane(0)
})

tracker.init()

const setLane = (lane) => player.setLane(lane)

new KeyboardController(setLane)
new HeadController(setLane)

const webcamController = new WebcamHeadController((lane, source) => {
  console.log('Lane change from', source, lane)
  player.setLane(lane)
})
const clock = new THREE.Clock()
let lives = 3

function animate() {
  requestAnimationFrame(animate)
  const dt = clock.getDelta()

  player.update(dt)
  obstacles.update(dt)
  progress.update(dt)
  ui.updateHUD(lives, progress.distance)

  for (const o of obstacles.obstacles) {
    if (!o.userData.hit && isColliding(player.mesh, o)) {
      o.userData.hit = true
      lives--
      if (lives <= 0) {
        ui.showMessage('GAME OVER', () => location.reload())
        return
      }
    }
  }

  if (progress.completed) {
    ui.showMessage('SUCCESS!', () => location.reload())
    return
  }

  renderer.render(scene, camera)
}

animate()
