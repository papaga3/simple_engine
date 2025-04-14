import { CANVAS_HEIGHT, CANVAS_WIDTH, PERSON_HALF } from "./constance";
import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
    step(): void {}
    drawImage(): void {}
    constructor() {
        super({});
        events.on("HERO_POSITION", this, (heroPos: Vector2) => {
            const halfWidth = (CANVAS_WIDTH/2) - PERSON_HALF;
            const halfHeight = (CANVAS_HEIGHT/2) - PERSON_HALF;

            this.position = new Vector2(halfWidth - heroPos.x, halfHeight - heroPos.y);
        });
    }
}