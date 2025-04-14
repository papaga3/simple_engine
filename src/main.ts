import { CustomAnimations } from './CustomAnimations';
import { FrameIndexPattern } from './FrameIndexPattern';
import { GameLoop } from './GameLoop';
import { gridCells, isSpaceFree } from './helpers/grid';
import { moveTowards } from './helpers/moveTowards';
import { Direction, Input } from './Input';
import { walls } from './levels/level_1';
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './objects/Hero/heroAnimation';
import { Scence } from './objects/Scence';
import { resources } from './Resources';
import { Sprites } from './Sprites';
import './style.css';
import { Vector2 } from './Vector2';

const main = () => {
  if(document.querySelector("#game_canvas") === null) {
    console.error("Cannot find game canvas");
    return;
  }
  const canvas = document.querySelector("#game_canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if(ctx === null) {
    console.error("Cannot create canvas context");
    return;
  }

  const mainScene = new Scence();

  const skySprite = new Sprites({
    resource: resources.imageList.sky,
    frameSize: new Vector2(320, 180),
    position: new Vector2(0, 0)
  });
  mainScene.addChild(skySprite);

  const groundSprite = new Sprites({
    resource: resources.imageList.ground,
    frameSize: new Vector2(320, 180),
    position: new Vector2(0, 0)
  });
  mainScene.addChild(groundSprite);

  const hero = new Sprites({ 
    resource: resources.imageList.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 2,
    position: new Vector2(gridCells(6), gridCells(5)),
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

  let heroFacing = Direction.DOWN;

  const heroDestinationPos = hero.position.duplicate();

  const shadow = new Sprites({
    resource: resources.imageList.shadow,
    frameSize: new Vector2(32, 32)
  });

  const input = new Input();
  // Updating game entities
  const update = (delta: number) => {
    const distance = moveTowards(hero, heroDestinationPos, 1);
    const hasArrived = distance <= 1;

    // Move again when the hero has arrived at the destination
    if(hasArrived) {
      tryMove();
    }

    // Hero animations
    hero.step(delta);
  }

  const tryMove = () => {
    if(input.direction() === null || input.direction() === Direction.ERROR) {
      switch(heroFacing) {
        case Direction.DOWN: {
          hero.animations?.play("standDown");
          break;
        }
        case Direction.UP: {
          hero.animations?.play("standUp");
          break;
        }
        case Direction.LEFT: {
          hero.animations?.play("standLeft");
          break;
        }
        case Direction.RIGHT: {
          hero.animations?.play("standRight");
          break;
        }
      }
      return;
    }
    let nextX = heroDestinationPos.x;
    let nextY = heroDestinationPos.y;
    const gridSize = 16;
    switch(input.direction()) {
      case Direction.UP: {
        nextY -= gridSize;
        hero.animations?.play("walkUp");
        break;
      }
      case Direction.DOWN: {
        nextY += gridSize;
        hero.animations?.play("walkDown");
        break;
      }
      case Direction.LEFT: {
        nextX -= gridSize;
        hero.animations?.play("walkLeft");
        break;
      }
      case Direction.RIGHT: {
        nextX += gridSize;
        hero.animations?.play("walkRight");
        break;
      }
      default: {
        break;
      }
    }

    if(input.direction() !== Direction.ERROR) { heroFacing = input.direction() }

    // Check if space is free
    if(isSpaceFree(walls, nextX, nextY)) {
      heroDestinationPos.x = nextX;
      heroDestinationPos.y = nextY;
    }
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /*
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);

    const heroOffset = new Vector2(-8, -20);
    const heroPosX = hero.position.x + heroOffset.x;
    const heroPosY = hero.position.y + heroOffset.y;

    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
    */
    mainScene.draw(ctx, 0, 0);
  }

  const gameLoop = new GameLoop(update, draw);
  gameLoop.start();
 
}

main();