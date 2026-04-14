export function randomChoice<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}

export function randomFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}