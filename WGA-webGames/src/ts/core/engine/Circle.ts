import { Vector2 } from "./Vector2";

export class Circle {
    public Position: Vector2;
    public Radius: number;

    constructor(position: Vector2, radius: number) {
        this.Position = position;
        this.Radius = radius;
    }

    public get Diameter(): number {
        return this.Radius + this.Radius;
    }
}
