import { GameLoop } from './GameLoop';
import { gridCells, isSpaceFree } from './helpers/grid';
import { moveTowards } from './helpers/moveTowards';
import { Direction, Input } from './Input';
import { walls } from './levels/level_1';
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

  const skySprite = new Sprites({
    resource: resources.imageList.sky,
    frameSize: new Vector2(320, 180),
    position: new Vector2(0, 0)
  });

  const groundSprite = new Sprites({
    resource: resources.imageList.ground,
    frameSize: new Vector2(320, 180),
    position: new Vector2(0, 0)
  });

  const hero = new Sprites({ 
    resource: resources.imageList.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 2,
    position: new Vector2(gridCells(6), gridCells(5))
  });

  const heroDestinationPos = hero.position.duplicate();

  const shadow = new Sprites({
    resource: resources.imageList.shadow,
    frameSize: new Vector2(32, 32)
  });

  const input = new Input();
  // Updating game entities
  const update = () => {
    const distance = moveTowards(hero, heroDestinationPos, 1);
    const hasArrived = distance <= 1;

    // Move again when the hero has arrived at the destination
    if(hasArrived) {
      tryMove();
    }
  }

  const tryMove = () => {
    if(input.direction() === null) return;
    let nextX = heroDestinationPos.x;
    let nextY = heroDestinationPos.y;
    const gridSize = 16;
    switch(input.direction()) {
      case Direction.UP: {
        console.log("up");
        nextY -= gridSize;
        hero.frame = 6;
        break;
      }
      case Direction.DOWN: {
        nextY += gridSize;
        hero.frame = 0;
        break;
      }
      case Direction.LEFT: {
        nextX -= gridSize;
        hero.frame = 9;
        break;
      }
      case Direction.RIGHT: {
        nextX += gridSize;
        hero.frame = 3;
        break;
      }
      default: {
        break;
      }
    }

    // Check if space is free
    if(isSpaceFree(walls, nextX, nextY)) {
      heroDestinationPos.x = nextX;
      heroDestinationPos.y = nextY;
    }
  }

  const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);

    const heroOffset = new Vector2(-8, -20);
    const heroPosX = hero.position.x + heroOffset.x;
    const heroPosY = hero.position.y + heroOffset.y;

    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
  }

  const gameLoop = new GameLoop(update, draw);
  gameLoop.start();
 
}

main();