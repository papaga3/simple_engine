import { Sprites } from "../Sprites";
import { Vector2 } from "../Vector2";

export const moveTowards = (person: Sprites, dest: Vector2, speed: number) => {
    let distanceX = dest.x - person.position.x;
    let distanceY = dest.y - person.position.y;

    let distance = Math.sqrt(distanceX**2 + distanceY**2);

    if(distance <= speed) {
        // done moving
        person.position.x = dest.x;
        person.position.y = dest.y;
    } else {
        // Otherwise move with speed to the destination
        const normalizedX = distanceX / distance;
        const normalizedY = distanceY / distance;

        person.position.x += normalizedX * speed;
        person.position.y += normalizedY * speed;

        // Update distance
        distanceX = dest.x - person.position.x;
        distanceY = dest.y - person.position.y;
        distance = Math.sqrt(distanceX**2 + distanceY**2);
    }

    return distance;
}
