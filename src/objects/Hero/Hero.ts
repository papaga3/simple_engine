import { CustomAnimations } from "../../CustomAnimations";
import { events } from "../../Events";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { Direction } from "../../Input";
import { ImgElement, resources } from "../../Resources";
import { Sprites } from "../../Sprites";
import { Vector2 } from "../../Vector2";
import { Scence } from "../Scence";
import { PICK_UP_DOWN, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './heroAnimation';

export class Hero extends GameObject {
    heroFacing: Direction;
    destinationPositon: Vector2;
    body: Sprites;
    lastX: number;
    lastY: number;
    itemPickUpTime: number;
    constructor(x: number, y: number, parent: GameObject) {
        super({ position: new Vector2(x, y), parent: parent });
        this.lastX = x;
        this.lastY = y;
        this.heroFacing = Direction.DOWN;
        this.destinationPositon = this.position.duplicate();
        this.itemPickUpTime = 0;
        this.body = new Sprites({ 
            resource: resources.imageList.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 2,
            position: new Vector2(-8, -20),
            parent: this,
            animations: new CustomAnimations({ 
              walkDown: new FrameIndexPattern(WALK_DOWN),
              walkUp: new FrameIndexPattern(WALK_UP),
              walkLeft: new FrameIndexPattern(WALK_LEFT),
              walkRight: new FrameIndexPattern(WALK_RIGHT),
              standDown: new FrameIndexPattern(STAND_DOWN),
              standUp: new FrameIndexPattern(STAND_UP),
              standLeft: new FrameIndexPattern(STAND_LEFT),
              standRight: new FrameIndexPattern(STAND_RIGHT),
              pickUpDown: new FrameIndexPattern(PICK_UP_DOWN)
            })
          });
        this.addChild(this.body);

        const shadow = new Sprites({
            resource: resources.imageList.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -20),
            parent: this,
        });

        this.addChild(shadow);
        
        events.on("HERO_PICKS_UP_ITEM", this, (data) => {
            this.onPickUpItem(data);
        });
    }

    //@ts-ignore
    step = (delta: number, root: Scence): void => {
        if(this.itemPickUpTime > 0) {
            this.workOnItemPickUp(delta);
            return;
        }

        const distance = moveTowards(this, this.destinationPositon, 1);
        const hasArrived = distance <= 1;
        // Move again when the hero has arrived at the destination
        if(hasArrived) {
            this.tryMove(root);
        }
        this.tryEmitPosition();
    }

    drawImage = (): void => {}
    
    tryMove = (root: Scence) => {
        const { input, walls } = root;
        if(input.direction() === null || input.direction() === Direction.ERROR) {
          switch(this.heroFacing) {
            case Direction.DOWN: {
              this.body.animations?.play("standDown");
              break;
            }
            case Direction.UP: {
              this.body.animations?.play("standUp");
              break;
            }
            case Direction.LEFT: {
              this.body.animations?.play("standLeft");
              break;
            }
            case Direction.RIGHT: {
              this.body.animations?.play("standRight");
              break;
            }
          }
          return;
        }
        let nextX = this.destinationPositon.x;
        let nextY = this.destinationPositon.y;
        const gridSize = 16;
        switch(input.direction()) {
          case Direction.UP: {
            nextY -= gridSize;
            this.body.animations?.play("walkUp");
            break;
          }
          case Direction.DOWN: {
            nextY += gridSize;
            this.body.animations?.play("walkDown");
            break;
          }
          case Direction.LEFT: {
            nextX -= gridSize;
            this.body.animations?.play("walkLeft");
            break;
          }
          case Direction.RIGHT: {
            nextX += gridSize;
            this.body.animations?.play("walkRight");
            break;
          }
          default: {
            break;
          }
        }
    
        if(input.direction() !== Direction.ERROR) { this.heroFacing = input.direction() }
    
        // Check if space is free
        if(isSpaceFree(walls, nextX, nextY)) {
          this.destinationPositon.x = nextX;
          this.destinationPositon.y = nextY;
        }
    }

    tryEmitPosition = () => {
        if(this.lastX === this.position.x && this.lastY === this.position.y) return;

        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("HERO_POSITION", this.position);
    }

    workOnItemPickUp = (delta: number) => {
        this.itemPickUpTime -= delta;
        this.body.animations?.play("pickUpDown");
    }

    onPickUpItem = (data: { image: ImgElement, position: Vector2 }) => {
        this.destinationPositon = data.position.duplicate();
        this.itemPickUpTime = 2500;
    }
}