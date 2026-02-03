import { FORWARD_SPEED } from './constants.js';


export class ProgressTracker {
constructor(targetDistance = 100) {
this.distance = 0;
this.targetDistance = targetDistance;
this.completed = false;
}


update(delta) {
if (this.completed) return;


this.distance += FORWARD_SPEED * delta;


if (this.distance >= this.targetDistance) {
this.completed = true;
}
}
}