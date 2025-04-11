import { GameLoop } from './GameLoop';
import { Direction, Input } from './Input';
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
    // position: new Vector2(0, 0)
  });

  const groundSprite = new Sprites({
    resource: resources.imageList.ground,
    frameSize: new Vector2(320, 180),
    // position: new Vector2(0, 0)
  });

  const hero = new Sprites({ 
    resource: resources.imageList.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 2,
    // position: new Vector2(16 * 5, 16 * 5)
  });

  const heroPos = new Vector2(16 * 5, 16 * 5);

  const shadow = new Sprites({
    resource: resources.imageList.shadow,
    frameSize: new Vector2(32, 32)
  });

  const input = new Input();
  // Updating game entities
  const update = () => {
    switch(input.direction()) {
      case Direction.UP: {
        console.log("UP");
        heroPos.y -= 1;
        hero.frame = 6;
        break;
      }
      case Direction.DOWN: {
        console.log("DOWN");
        heroPos.y += 1;
        hero.frame = 0;
        break;
      }
      case Direction.LEFT: {
        console.log("LEFT");
        heroPos.x -= 1;
        hero.frame = 9;
        break;
      }
      case Direction.RIGHT: {
        console.log("RIGHT");
        heroPos.x += 1;
        hero.frame = 3;
        break;
      }
      default: {
        break;
      }
    }
  }

  const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);
    shadow.drawImage(ctx, heroPos.x, heroPos.y)
    hero.drawImage(ctx, heroPos.x, heroPos.y);
  }

  const gameLoop = new GameLoop(update, draw);
  gameLoop.start();
 
}

main();