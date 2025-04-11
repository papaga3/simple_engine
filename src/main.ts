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
    frameSize: new Vector2(320, 180)
  });

  const groundSprite = new Sprites({
    resource: resources.imageList.ground,
    frameSize: new Vector2(320, 180)
  });

  const hero = new Sprites({ 
    resource: resources.imageList.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 2
  });

  const heroPos = new Vector2(16 * 5, 16 * 5);
  
  const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);
    hero.drawImage(ctx, heroPos.x, heroPos.y);
  }

  setInterval(() => {
    draw()
  }, 300);
}

main();


