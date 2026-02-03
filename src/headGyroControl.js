export class HeadGyroController {
  constructor(onLaneChange) {
    this.lane = 0
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma == null) return
      let l = 0
      if (e.gamma > 12) l = 1
      else if (e.gamma < -12) l = -1
      if (l !== this.lane) {
        this.lane = l
        onLaneChange(l)
      }
    })
  }
}
