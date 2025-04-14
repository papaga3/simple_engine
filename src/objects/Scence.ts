import { GameObject } from "../GameObject";
import { Vector2 } from "../Vector2";

export class Scence extends GameObject{
    step(): void {}
    drawImage(): void {}
    constructor() {
        super({ position: new Vector2(0, 0) });
    }
}