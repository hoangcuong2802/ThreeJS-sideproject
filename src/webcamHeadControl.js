import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import '@tensorflow/tfjs-backend-webgl'


export class WebcamHeadController {
constructor(onLaneChange) {
this.onLaneChange = onLaneChange
this.currentLane = 0
this.deadZone = 0.03


this.init()
}


async init() {
this.video = document.createElement('video')
this.video.autoplay = true
this.video.playsInline = true


const stream = await navigator.mediaDevices.getUserMedia({ video: true })
this.video.srcObject = stream


this.model = await faceLandmarksDetection.load(
faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
)


this.track()
}


async track() {
const faces = await this.model.estimateFaces({
input: this.video,
predictIrises: false
})


if (faces.length > 0) {
const keypoints = faces[0].scaledMesh
const nose = keypoints[1] // nose tip
const leftFace = keypoints[234] // left cheek
const rightFace = keypoints[454] // right cheek


const centerX = (leftFace[0] + rightFace[0]) / 2
const offset = (nose[0] - centerX) / (rightFace[0] - leftFace[0])


let lane = 0
if (offset > this.deadZone) lane = 1
else if (offset < -this.deadZone) lane = -1


if (lane !== this.currentLane) {
this.currentLane = lane
this.onLaneChange(lane)
}
}


requestAnimationFrame(() => this.track())
}
}