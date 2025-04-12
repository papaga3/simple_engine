import { FrameIndexPattern } from "./FrameIndexPattern";

export class CustomAnimations {
    patterns: Record<string, FrameIndexPattern>;
    activeKey: string;
    constructor(patterns: Record<string, FrameIndexPattern>) {
        this.patterns = patterns;
        this.activeKey = Object.keys(this.patterns)[0];
    }

    step = (delta: number) => {
        this.patterns[this.activeKey].step(delta);
    }

    play = (key: string, startAtTime = 0) => {
        if(this.activeKey === key) return;
        // Switch
        this.activeKey = key;
        this.patterns[this.activeKey].currentTime = startAtTime;
    }

    frame = (): number => {
        return this.patterns[this.activeKey].frame();
    }
}