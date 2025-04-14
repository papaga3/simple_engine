import { events } from "./Events";
import { Vector2 } from "./Vector2";

interface Input {
    position?: Vector2;
    drawOffSet?: Vector2;
    parent?: GameObject;
}

export abstract class GameObject {
    position: Vector2;
    children: GameObject[];
    drawOffSet: Vector2;
    parent: GameObject | null;

    constructor(input: Input) {
        this.drawOffSet = input.drawOffSet ?? new Vector2(0, 0);
        this.position = input.position ?? new Vector2(0, 0);
        this.parent = input.parent ?? null;
        this.children = [];
    }

    stepEntry = (delta: number, root: GameObject) => {
        this.children.forEach((child) => child.stepEntry(delta, root));
        this.step(delta, root);
    }

    // Call everyframe
    abstract step(delta: number, root: GameObject): void;

    draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const drawPosX = x + this.position.x + this.drawOffSet.x;
        const drawPosY = y + this.position.y + this.drawOffSet.y;

        // do actual drawing
        this.drawImage(ctx, drawPosX, drawPosY);

        // pass to children
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }

    abstract drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void;

    // Destroy the current instance
    destroy = () => {
        // Destroy all children
        this.children.forEach((child) => { child.destroy() });

        // remove this from its parents
        if(this.parent !== null) { this.parent.removeChild(this); }
    }

    addChild(gameObject: GameObject) {
        this.children.push(gameObject);
    }

    removeChild(gameObject: GameObject) {
         // Unsubscribe from event
        events.unsunscribe(gameObject);

        this.children = this.children.filter((g) => {
            return gameObject !== g;
        });
    }
}

export class BasicGameObject extends GameObject {
    constructor(input: Input) {
        super(input);
    }
    step(): void {}
    drawImage(): void {}
}