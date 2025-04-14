import { GameObject } from "../GameObject";
import { Input } from "../Input";
import { Vector2 } from "../Vector2";

interface Props {
    walls?: Set<string>;
}

export class Scence extends GameObject{
    step(): void {}
    drawImage(): void {}
    input: Input;
    walls: Set<string>;
    constructor(props: Props) {
        super({ position: new Vector2(0, 0) });
        this.input = new Input();
        this.walls = props.walls ?? new Set<string>();
    }
}