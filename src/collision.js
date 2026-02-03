import * as THREE from 'three'

export function isColliding(a, b) {
  if (!a || !b) return false
  return new THREE.Box3().setFromObject(a)
    .intersectsBox(new THREE.Box3().setFromObject(b))
}
