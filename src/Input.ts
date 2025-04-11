export const enum Direction {
    UP, DOWN, LEFT, RIGHT, ERROR = -1
}

export class Input {

    heldDirections: Array<number>;
    constructor() {
        this.heldDirections = new Array<number>();
        document.addEventListener("keydown", (e) => {
            if(e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowPressed(Direction.UP);
            }
            if(e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowPressed(Direction.DOWN);
            }
            if(e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowPressed(Direction.LEFT);
            }
            if(e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowPressed(Direction.RIGHT);
            }
        });

        document.addEventListener("keyup", (e) => {
            if(e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowReleased(Direction.UP);
            }
            if(e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowReleased(Direction.DOWN);
            }
            if(e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowReleased(Direction.LEFT);
            }
            if(e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowReleased(Direction.RIGHT);
            }
        });
    }

    onArrowPressed = (direction: Direction) => {
        // Add new key to the end of the input array
        if(this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.push(direction);
        }
    }

    onArrowReleased = (direction: Direction) => {
        const index = this.heldDirections.indexOf(direction);
        if(index === -1) return;

        // Remove this entry from input array
        this.heldDirections.splice(index, 1);
    }

    direction = (): Direction => {
        if(this.heldDirections.length === 0) return Direction.ERROR;
        return this.heldDirections[this.heldDirections.length - 1];
    }
}