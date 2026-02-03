export class KeyboardController {
  constructor(onLaneChange) {
    this.currentLane = 0

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.currentLane = Math.max(-1, this.currentLane - 1)
        onLaneChange(this.currentLane)
      }

      if (e.key === 'ArrowRight') {
        this.currentLane = Math.min(1, this.currentLane + 1)
        onLaneChange(this.currentLane)
      }
    })
  }
}
