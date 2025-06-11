
import StateMachine from "./stateMachine/stateMachine.js";
import PlayState from "./stateMachine/playState.js";

const canvas = document.getElementById("officeBoyGame");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const stateMachine = new StateMachine();
stateMachine.changeState(new PlayState(stateMachine));

function update(deltaTime) {
    stateMachine.update(deltaTime);
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    stateMachine.draw(ctx);
}

let startTime = Date.now();

function gameloop(){
    const currentTime = Date.now();
    const deltaTime = currentTime - startTime;
    startTime = currentTime;
    
    update(deltaTime);
    draw();
    requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);

