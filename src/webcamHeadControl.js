import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'
import * as Kalidokit from 'kalidokit'

export class WebcamHeadController {
  constructor(onMove) {
    this.onMove = onMove // callback(offsetX)
    this.video = document.createElement('video')
    this.video.autoplay = true
    this.video.playsInline = true
  }

  async init() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' }
    })
    this.video.srcObject = stream

    this.faceMesh = new FaceMesh({
      locateFile: file =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    })

    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6
    })

    this.faceMesh.onResults(this.onResults.bind(this))

    this.camera = new Camera(this.video, {
      onFrame: async () => {
        await this.faceMesh.send({ image: this.video })
      },
      width: 640,
      height: 480
    })

    this.camera.start()
    console.log('HeadTracker ready')
  }

  onResults(results) {
    if (!results.multiFaceLandmarks?.length) return

    const landmarks = results.multiFaceLandmarks[0]

    const rigged = Kalidokit.Face.solve(landmarks, {
      runtime: 'mediapipe',
      smoothBlink: true
    })

    const yaw = rigged.head.y // trái (-) → phải (+)

    // clamp + scale
    const offset = Math.max(-1, Math.min(1, yaw * 2))

    console.log('head offset', offset.toFixed(2))

    this.onMove(offset)
  }
}
