import { GameObject } from "../../GameObject";
import { Vector2 } from "../../Vector2";

export class Hero extends GameObject {
    constructor(x: number, y: number) {
        super({ position: new Vector2(x, y) });
    }

    step = (delta: number): void => {
        
    }

    drawImage = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
        
    }
}