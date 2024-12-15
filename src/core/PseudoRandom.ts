export class PseudoRandom {
    private m: number = 0x80000000; // 2**31
    private a: number = 1103515245;
    private c: number = 12345;
    private state: number;

    constructor(seed: number) {
        this.state = seed % this.m;
    }

    /**
     * Generates the next pseudorandom number.
     * @returns A number between 0 (inclusive) and 1 (exclusive).
     */
    next(): number {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state / this.m;
    }

    /**
     * Generates a random integer between min (inclusive) and max (exclusive).
     */
    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min) + min);
    }

    /**
     * Generates a random float between min (inclusive) and max (exclusive).
     */
    nextFloat(min: number, max: number): number {
        return this.next() * (max - min) + min;
    }

    nextID(): string {
        return this.nextInt(0, 1000000).toString(36).padStart(5, '0');
    }

    randElement<T>(arr: T[]): T {
        if (arr.length == 0) {
            throw new Error('array must not be empty')
        }
        return arr[this.nextInt(0, arr.length)];
    }

    chance(odds: number): boolean {
        return this.nextInt(0, odds) == 0
    }

}