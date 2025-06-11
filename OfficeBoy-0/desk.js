import GameObject from "./gameObject.js";

export default class Desk extends GameObject {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);        
    }    

    draw(ctx) {

        ctx.fillStyle = "rgba(0, 255, 0, 0.5)"; // Semi-transparent green overlay for occupied desks
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }
}