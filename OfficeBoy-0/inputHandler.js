export default class InputHandler {
    constructor() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            KeyW: false,
            KeyA: false,
            KeyS: false,
            KeyD: false,
            Space: false,
            Enter: false,
        };

        window.addEventListener('keydown', (event) => {
            if (event.code in this.keys) {
                this.keys[event.code] = true;
            }            
            console.log(`Key pressed: ${event.code}, State: ${this.keys[event.code]}`);
        });

        window.addEventListener('keyup', (event) => {
            if (event.code in this.keys) {
                this.keys[event.code] = false;
            }
        });
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }
}

