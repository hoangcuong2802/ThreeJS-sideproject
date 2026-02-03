export class GameState {
constructor() {
this.lives = 3;
this.gameOver = false;
}


hit() {
if (this.gameOver) return;


this.lives--;
console.log('Lives:', this.lives);


if (this.lives <= 0) {
this.gameOver = true;
console.log('GAME OVER');
}
}
}