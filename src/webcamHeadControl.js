import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'

export class WebcamHeadController {
  constructor(onLaneChange) {
    this.onLaneChange = onLaneChange
    this.currentLane = 0
    this.smoothedOffset = 0

    this.deadZone = 0.15
    this.smoothFactor = 0.25
    this.detectInterval = 150

    this.init()
  }

  async init() {
    await tf.setBackend('webgl')
    await tf.ready()

    this.video = document.createElement('video')
    this.video.autoplay = true
    this.video.playsInline = true

    this.video.srcObject = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240 }
    })

    await this.video.play()
    console.log('Webcam ready')

    this.detector = await faceLandmarksDetection.createDetector(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
      {
        runtime: 'tfjs',
        refineLandmarks: false
      }
    )

    console.log('Face detector ready')
    this.track()
  }

  async track() {
    const faces = await this.detector.estimateFaces(this.video)

    console.log('faces', faces.length)

    if (faces.length > 0) {
      const keypoints = faces[0].keypoints

      const nose = keypoints.find(p => p.name === 'noseTip')
      const left = keypoints.find(p => p.name === 'leftCheek')
      const right = keypoints.find(p => p.name === 'rightCheek')

      if (nose && left && right) {
        const centerX = (left.x + right.x) / 2
        const faceWidth = right.x - left.x
        const offset = (nose.x - centerX) / (faceWidth * 0.5)

        this.smoothedOffset +=
          (offset - this.smoothedOffset) * this.smoothFactor

        console.log('offset', this.smoothedOffset.toFixed(2))

        let lane = 0
        if (this.smoothedOffset > this.deadZone) lane = 1
        else if (this.smoothedOffset < -this.deadZone) lane = -1

        if (lane !== this.currentLane) {
          this.currentLane = lane
          this.onLaneChange(lane, 'webcam')
        }
      }
    }

    setTimeout(() => this.track(), this.detectInterval)
  }
}
