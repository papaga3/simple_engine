import { resources } from './Resources';
import './style.css';

if(document.querySelector("#game_canvas") === null) {
  console.error("game canvas not found");
} else {
  const canvas = document.querySelector("#game_canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  const draw = () => {
    const sky = resources.imageList.sky;
    if(sky.isLoaded) {
      ctx?.drawImage(sky.image, 0, 0);
    }

    const ground = resources.imageList.ground;
    if(ground.isLoaded) {
      ctx?.drawImage(ground.image, 0, 0);
    }
  }


  /*setInterval(() => {
    draw()
  }, 300);*/
}


