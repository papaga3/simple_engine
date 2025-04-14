import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resources";
import { Sprites } from "../../Sprites";
import { Vector2 } from "../../Vector2";

export class Rod extends GameObject {
    constructor(x: number, y: number, parent: GameObject) {
        super({ position: new Vector2(x, y), parent: parent });

        const sprites = new Sprites({
            resource: resources.imageList.rod,
            position: new Vector2(0, -5),
            parent: this
        });
        this.addChild(sprites);
        events.on("HERO_POSITION", this, (heroPos: Vector2) => {
            const roundedX = Math.round(heroPos.x);
            const roundedY = Math.round(heroPos.y);

            if(this.position.x === roundedX && this.position.y === roundedY) {
                this.onCollidWithHero();
            }
        });
    }

    onCollidWithHero = () => {
        // remove from the scence
        this.destroy();

        // Alert other things that this is item is picked up
        events.emit("HERO_PICKS_UP_ITEM", { image: resources.imageList.rod, position: this.position });
    }
    
    step(): void {}
    drawImage(): void {}
}