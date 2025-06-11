import GameObject from './gameObject.js';
import InputHandler from './inputHandler.js';

export default class Player extends GameObject {
    constructor(x, y, width, height, color, maxSpeed, acceleration = 1000, deceleration = 1250) {
        super(x, y, width, height, color);
        this.maxSpeed = maxSpeed;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.input = new InputHandler();
        this.acceleration = acceleration; // Acceleration factor
        this.deceleration = deceleration; // Deceleration factor
    }

    accelerate(timeDeltaSec) {
        let isAcceleratingX = false;
        let isAcceleratingY = false;

        // Handle horizontal acceleration
        if (this.input.isKeyPressed("ArrowLeft")) {
            this.xSpeed -= this.acceleration * timeDeltaSec;
            isAcceleratingX = true;
        }
        if (this.input.isKeyPressed("ArrowRight")) {
            this.xSpeed += this.acceleration * timeDeltaSec;
            isAcceleratingX = true;
        }

        // Handle vertical acceleration
        if (this.input.isKeyPressed("ArrowUp")) {
            this.ySpeed -= this.acceleration * timeDeltaSec;
            isAcceleratingY = true;
        }
        if (this.input.isKeyPressed("ArrowDown")) {
            this.ySpeed += this.acceleration * timeDeltaSec;
            isAcceleratingY = true;
        }
        return { isAcceleratingX, isAcceleratingY };
    }

    decelerate(timeDeltaSec, isAcceleratingX, isAcceleratingY) {
        const decelerationRate = this.deceleration;

        // Apply horizontal deceleration if not accelerating
        if (!isAcceleratingX) {
            if (this.xSpeed > 0) {
                this.xSpeed -= decelerationRate * timeDeltaSec;
                if (this.xSpeed < 0) this.xSpeed = 0; // Clamp to zero
            } else if (this.xSpeed < 0) {
                this.xSpeed += decelerationRate * timeDeltaSec;
                if (this.xSpeed > 0) this.xSpeed = 0; // Clamp to zero
            }
        }

        // Apply vertical deceleration if not accelerating
        if (!isAcceleratingY) {
            if (this.ySpeed > 0) {
                this.ySpeed -= decelerationRate * timeDeltaSec;
                if (this.ySpeed < 0) this.ySpeed = 0; // Clamp to zero
            } else if (this.ySpeed < 0) {
                this.ySpeed += decelerationRate * timeDeltaSec;
                if (this.ySpeed > 0) this.ySpeed = 0; // Clamp to zero
            }
        }
    }

    suddenBreak() {
        // Freno brusco que eventualmente derrama un poco de café
        // pero ayuda a llegar más rápido a la meta
        if (this.input.isKeyPressed("ArrowLeft") && this.xSpeed > 0) {
            this.xSpeed = 0;
            // this.spill += derrameExtra;
        }
        if (this.input.isKeyPressed("ArrowRight") && this.xSpeed < 0) {
            this.xSpeed = 0;
            // this.spill += derrameExtra;
        }
        if (this.input.isKeyPressed("ArrowUp") && this.ySpeed > 0) {
            this.ySpeed = 0;
            // this.spill += derrameExtra;
        }
        if (this.input.isKeyPressed("ArrowDown") && this.ySpeed < 0) {
            this.ySpeed = 0;
            // this.spill += derrameExtra;
        }
    }

    update(dt) {
        const timeDeltaSec = dt / 1000; // Convert delta time from milliseconds to seconds

        const { isAcceleratingX, isAcceleratingY } = this.accelerate(timeDeltaSec);
        this.decelerate(timeDeltaSec, isAcceleratingX, isAcceleratingY);
        this.suddenBreak(); // Consider if suddenBreak should interact with isAccelerating flags or occur before/after deceleration

        // Clamp speeds to maxSpeed
        this.xSpeed = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.xSpeed));
        this.ySpeed = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.ySpeed));

        // Update position based on final speeds
        this.x += this.xSpeed * timeDeltaSec;
        this.y += this.ySpeed * timeDeltaSec;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Additional methods for Player can be added here, such as collision detection, spilling coffee, etc.