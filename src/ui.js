export class UI {
constructor() {
this.container = document.createElement('div');
this.container.style.cssText = `
position: fixed;
top: 0; left: 0;
width: 100%; height: 100%;
pointer-events: none;
font-family: Arial, sans-serif;
color: white;
`;


this.hud = document.createElement('div');
this.hud.style.cssText = `
position: absolute;
top: 20px; left: 20px;
font-size: 18px;
`;


this.message = document.createElement('div');
this.message.style.cssText = `
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%, -50%);
font-size: 32px;
display: none;
pointer-events: auto;
text-align: center;
`;


this.container.appendChild(this.hud);
this.container.appendChild(this.message);
document.body.appendChild(this.container);
}


updateHUD(lives, distance) {
this.hud.innerHTML = `❤️ Lives: ${lives}<br/>🏃 Distance: ${distance.toFixed(0)}`;
}


showMessage(text, onRestart) {
this.message.innerHTML = `${text}<br/><br/><button>Restart</button>`;
this.message.style.display = 'block';


const btn = this.message.querySelector('button');
btn.onclick = onRestart;
}
}