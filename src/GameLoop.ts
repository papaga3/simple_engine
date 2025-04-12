export class GameLoop {
    lastTimeFrame: number;
    accumulatedTime: number;
    timeStep: number;
    update: (timestep: number) => void;
    render: () => void;
    rafId: null | number;
    isRunning: boolean;

    constructor(update: (delta: number) => void, render: () => void) {
        this.lastTimeFrame = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 fpgs

        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }

    mainLoop = (timestamp: number) => {
        if(!this.isRunning) return;

        let deltaTime = timestamp - this.lastTimeFrame;
        this.lastTimeFrame = timestamp;

        // Accumulate time since last frame
        this.accumulatedTime += deltaTime;

        // Enough time passed, update the game
        if(this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep);
            // this.accumulatedTime -= this.timeStep;
            this.accumulatedTime = 0;
        }
       
        // render
        this.render();

        // animation id, can be used to cancel animation
        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start = () => {
        if(!this.isRunning) this.isRunning = true;
        // fire animation
        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    stop = () => {
        if(this.rafId) { 
            // cancel animation 
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}