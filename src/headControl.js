export class HeadController {
  constructor(onLaneChange) {
    this.currentLane = 0
    this.deadZone = 10

    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma == null) return

      let lane = 0
      if (e.gamma > this.deadZone) lane = 1
      else if (e.gamma < -this.deadZone) lane = -1

      if (lane !== this.currentLane) {
        this.currentLane = lane
        onLaneChange(lane)
      }
    })
  }
}
