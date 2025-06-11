export default class StateMachine {   

    changeState(newState) {
        this.currentState = newState;
    }

    update(dt){
        this.currentState.update(dt);
    }

    draw(ctx) {
        this.currentState.draw(ctx);
    }
}