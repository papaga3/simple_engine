interface Props {
    resource: HTMLImageElement; // What image to draw
    frameSize: number; // size of the frame
    hFrames?: number; // how the sprite arranged horizontally
    vFrames?: number; // how the sprite arranged vertically
    frame?: number; // Which frame we want to show
    scale?: number; // image scale
    position: {x: number, y: number}; // where to draw
}

export class Sprites {
    resource: HTMLImageElement; // What image to draw
    frameSize: number; // size of the frame
    hFrames: number; // how the sprite arranged horizontally
    vFrames: number; // how the sprite arranged vertically
    frame: number; // Which frame we want to show
    scale: number; // image scale
    position: {x: number, y: number}; // where to draw
    frameMap: any;

    constructor (input: Props) {
        this.resource = input.resource;
        this.frameSize = input.frameSize;
        this.hFrames = input.hFrames ?? 1;
        this.vFrames = input.vFrames ?? 1;
        this.frame = input.frame ?? 0;
        this.scale = input.scale ?? 1;
        this.position = input.position;

        this.frameMap = new Map();
    }

    buildFrameMap() {
        // let frameCount = 0;
        for(let v = 0; v < this.vFrames; v++) {
            for(let h = 0; h < this.hFrames; h++) {
                console.log(`Frame ${h}-${v}`);
            }
        }
    }
}
