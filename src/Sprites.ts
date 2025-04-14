import { CustomAnimations } from "./CustomAnimations";
import { GameObject } from "./GameObject";
import { ImgElement } from "./Resources";
import { Vector2 } from "./Vector2";

interface Props {
    resource: ImgElement; // What image to draw
    frameSize?: Vector2; // size of the frame
    hFrames?: number; // how the sprite arranged horizontally
    vFrames?: number; // how the sprite arranged vertically
    frame?: number; // Which frame we want to show
    scale?: number; // image scale
    position?: Vector2; // where to draw
    animations?: CustomAnimations;
    parent?: GameObject;
}

export class Sprites extends GameObject{
    resource: ImgElement; // What image to draw
    frameSize: Vector2; // size of the frame
    hFrames: number; // how the sprite arranged horizontally
    vFrames: number; // how the sprite arranged vertically
    frame: number; // Which frame we want to show
    scale: number; // image scale
    // position: Vector2; // where to draw
    frameMap: Map<number, Vector2>;
    animations: CustomAnimations | null;

    constructor (input: Props) {
        super({ position: input.position, parent: input.parent })
        this.resource = input.resource;
        this.frameSize = input.frameSize ?? new Vector2(16, 16);
        this.hFrames = input.hFrames ?? 1;
        this.vFrames = input.vFrames ?? 1;
        this.frame = input.frame ?? 0;
        this.scale = input.scale ?? 1;
        // this.position = input.position ?? new Vector2(0, 0);

        this.frameMap = new Map<number, Vector2>();
        this.buildFrameMap();

        this.animations = input.animations ?? null;
    }

    buildFrameMap() {
        let frameCount = 0;
        for(let v = 0; v < this.vFrames; v++) {
            for(let h = 0; h < this.hFrames; h++) {
                this.frameMap.set(frameCount, new Vector2(this.frameSize.x * h, this.frameSize.y * v));
                frameCount++;
            }
        }
    }

    step(delta: number) {
        if(!this.animations) { return; }
        this.animations.step(delta);
        this.frame = this.animations.frame();
    }

    drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
        // Image is not loaded, nothing to draw
        if(!this.resource.isLoaded) {
            return;
        }

        // position of current frame in the spritesheet
        let frameCoordX = 0, frameCoordY = 0;
        const frame = this.frameMap.get(this.frame);
        if(frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        // set framesize
        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCoordX, 
            frameCoordY, //
            frameSizeX,
            frameSizeY,
            x,
            y,
            frameSizeX * this.scale,
            frameSizeY * this.scale
        );
    }
}
