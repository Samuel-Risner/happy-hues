export function randomChoice<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}

export function randomFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomBool(): boolean {
  return Math.random() < 0.5;
}