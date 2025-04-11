// Check if the object has the correct key
export function isKey<T extends object>(
    x: T,
    k: PropertyKey
): k is keyof T {
    return k in x;
}