import { Vector2 } from "./Vector2";

interface Input {
    position?: Vector2;
    drawOffSet?: Vector2;
}

export abstract class GameObject {
    position: Vector2;
    children: GameObject[];
    drawOffSet: Vector2;

    constructor(input: Input) {
        this.drawOffSet = input.drawOffSet ?? new Vector2(0, 0);
        this.position = input.position ?? new Vector2(0, 0);
        this.children = [];
    }

    stepEntry = (delta: number, root: any) => {
        this.children.forEach((child) => child.stepEntry(delta, root));
        this.step(delta);
    }

    // Call everyframe
    abstract step(delta: number): void;

    draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const drawPosX = x + this.position.x + this.drawOffSet.x;
        const drawPosY = y + this.position.y + this.drawOffSet.y;

        // do actual drawing
        this.drawImage(ctx, drawPosX, drawPosY);

        // pass to children
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }

    abstract drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void;

    addChild(gameObject: GameObject) {
        this.children.push(gameObject);
    }

    removeChild(gameObject: GameObject) {
        this.children = this.children.filter((g) => {
            return gameObject !== g;
        });
    }
}