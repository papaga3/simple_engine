export interface Frame {
    time: number;
    frame: number;
}

export interface AnimationConfig {
    duration: number;
    frames: Frame[];
}