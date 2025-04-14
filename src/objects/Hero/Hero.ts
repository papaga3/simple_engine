import { CustomAnimations } from "../../CustomAnimations";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { Direction } from "../../Input";
import { resources } from "../../Resources";
import { Sprites } from "../../Sprites";
import { Vector2 } from "../../Vector2";
import { Scence } from "../Scence";
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './heroAnimation';

export class Hero extends GameObject {
    heroFacing: Direction;
    destinationPositon: Vector2;
    body: Sprites;
    constructor(x: number, y: number) {
        super({ position: new Vector2(x, y) });
        this.heroFacing = Direction.DOWN;
        this.destinationPositon = this.position.duplicate();
        this.body = new Sprites({ 
            resource: resources.imageList.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 2,
            position: new Vector2(-8, -20),
            animations: new CustomAnimations({ 
              walkDown: new FrameIndexPattern(WALK_DOWN),
              walkUp: new FrameIndexPattern(WALK_UP),
              walkLeft: new FrameIndexPattern(WALK_LEFT),
              walkRight: new FrameIndexPattern(WALK_RIGHT),
              standDown: new FrameIndexPattern(STAND_DOWN),
              standUp: new FrameIndexPattern(STAND_UP),
              standLeft: new FrameIndexPattern(STAND_LEFT),
              standRight: new FrameIndexPattern(STAND_RIGHT)
            })
          });
        this.addChild(this.body);

        const shadow = new Sprites({
            resource: resources.imageList.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -20),
        });

        this.addChild(shadow);
    }
    
    step = (delta: number, root: Scence): void => {
        const distance = moveTowards(this, this.destinationPositon, 1);
        const hasArrived = distance <= 1;

        // Move again when the hero has arrived at the destination
        if(hasArrived) {
            this.tryMove(root);
        }
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
}