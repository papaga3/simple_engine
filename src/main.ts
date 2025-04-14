import { GameLoop } from './GameLoop';
import { gridCells } from './helpers/grid';
import { walls } from './levels/level_1';
import { Hero } from './objects/Hero/Hero';
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

  const hero = new Hero(gridCells(6), gridCells(5));
  mainScene.addChild(hero);

  // Updating game entities
  const update = (delta: number) => {
    mainScene.stepEntry(delta, mainScene);
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mainScene.draw(ctx, 0, 0);
  }

  const gameLoop = new GameLoop(update, draw);
  gameLoop.start();
 
}

main();