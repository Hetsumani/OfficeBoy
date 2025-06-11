import StateMachine from "./stateMachine.js";
import DeliveryState from "./deliveryState.js";

import Player from "../player.js";
import Desk from "../desk.js";


export default class PlayState {
    constructor(stateMachine) {
        const canvas = document.getElementById("officeBoyGame");
        const ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.stateMachine = stateMachine;
        this.desk = new Desk(1000, 600, 200, 100, "#D6D58E");
        this.player = new Player(25, this.canvasHeight / 2, 50, 50, "#9FC131", 500);
    }

    update(dt) {

        this.player.update(dt);

        if (collisionDetection(this.player, this.desk)) {
            console.log("Collision detected with desk!");
            this.stateMachine.changeState(new DeliveryState(this.stateMachine, this.player, this.desk));
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.desk.draw(ctx);
        this.player.draw(ctx);
    }
}

function collisionDetection(player, desk) {
    return (
        player.x < desk.x + desk.width &&
        player.x + player.width > desk.x &&
        player.y < desk.y + desk.height &&
        player.y + player.height > desk.y
    );
}