import InputHandler from "../inputHandler.js";
import PlayState from "./playState.js";

export default class DeliveryState {
    constructor(stateMachine, player, desk) {
        this.player = player;
        this.desk = desk;
        const canvas = document.getElementById("officeBoyGame");
        const ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.stateMachine = stateMachine;
        this.input = new InputHandler();
    }

    update(dt) {        
        // Handle input for restarting the game
        if (this.input.isKeyPressed("Enter")) {
            this.stateMachine.changeState(new PlayState(this.stateMachine));
        }
    }

    draw(ctx) {

        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        // Draw the player and desk
        this.player.draw(ctx);
        this.desk.draw(ctx);
        // Draw delivery-specific elements here
        ctx.fillStyle = "#FFCC00"; // Example color for delivery state
        ctx.font = "30px Arial";
        ctx.fillText("Delivery successful!", this.canvasWidth / 2, this.canvasHeight / 2);
        ctx.fillText("Press ENTER to restart", this.canvasWidth / 2, this.canvasHeight / 2 + 40);
    }
}