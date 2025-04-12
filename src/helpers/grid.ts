// Snap the asset into a 16x16 grid
export const gridCells = (n: number) => {
    return n * 16;
}

export const isSpaceFree = (walls: Set<string>, x: number, y: number) => {
    const str = `${x},${y}`;
    if(walls.has(str)) return false;
    return true;
}