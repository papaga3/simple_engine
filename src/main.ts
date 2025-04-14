import { Camera } from './Camera';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constance';
import { GameLoop } from './GameLoop';
import { gridCells } from './helpers/grid';
import { walls } from './levels/level_1';
import { Hero } from './objects/Hero/Hero';
import { Rod } from './objects/Rod/Rod';
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

  const mainScene = new Scence({ walls: walls });

  const skySprite = new Sprites({
    resource: resources.imageList.sky,
    frameSize: new Vector2(CANVAS_WIDTH, CANVAS_HEIGHT),
    position: new Vector2(0, 0)
  });

  const groundSprite = new Sprites({
    resource: resources.imageList.ground,
    frameSize: new Vector2(CANVAS_WIDTH, CANVAS_HEIGHT),
    position: new Vector2(0, 0)
  });
  mainScene.addChild(groundSprite);

  const hero = new Hero(gridCells(6), gridCells(5), mainScene);
  mainScene.addChild(hero);
  const camera = new Camera();
  mainScene.addChild(camera);
  const rod = new Rod(gridCells(7), gridCells(6), mainScene);
  mainScene.addChild(rod);

  // Updating game entities
  const update = (delta: number) => {
    mainScene.stepEntry(delta, mainScene);
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw sky box
    skySprite.draw(ctx, 0, 0);

    // save current state
    ctx.save();

    // offset everything
    ctx.translate(camera.position.x, camera.position.y);

    mainScene.draw(ctx, 0, 0);

    // restore state
    ctx.restore();
  }

  const gameLoop = new GameLoop(update, draw);
  gameLoop.start();
 
}

main();