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
    position: new Vector2(16 * 5, 16 * 5)
  });

  const input = new Input();
  // Updating game entities
  const update = (timestamp: number) => {
    switch(input.direction()) {
      case Direction.UP: {
        console.log("UP");
        hero.position.y -= 1;
        break;
      }
      case Direction.DOWN: {
        console.log("DOWN");
        hero.position.y += 1;
        break;
      }
      case Direction.LEFT: {
        console.log("LEFT");
        hero.position.x -= 1;
        break;
      }
      case Direction.RIGHT: {
        console.log("RIGHT");
        hero.position.x += 1;
        break;
      }
      default: {
        break;
      }
    }
  }

  const draw = () => {
    skySprite.drawImage(ctx);
    groundSprite.drawImage(ctx);
    hero.drawImage(ctx);
  }

  const gameLoop = new GameLoop(update, draw);
  gameLoop.start();
 
}

main();


