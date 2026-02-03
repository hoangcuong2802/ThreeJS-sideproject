import * as THREE from 'three';
import { FORWARD_SPEED } from './constants.js';


export class World {
constructor(scene) {
this.speed = FORWARD_SPEED;
this.grounds = [];


const geo = new THREE.PlaneGeometry(10, 20);
const mat = new THREE.MeshStandardMaterial({ color: 0x444444 });


for (let i = 0; i < 2; i++) {
const ground = new THREE.Mesh(geo, mat);
ground.rotation.x = -Math.PI / 2;
ground.position.z = -i * 20;
scene.add(ground);
this.grounds.push(ground);
}
}


update(delta) {
for (const g of this.grounds) {
g.position.z += this.speed * delta;
if (g.position.z > 10) {
g.position.z -= 40;
}
}
}
}