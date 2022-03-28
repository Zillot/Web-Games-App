import { Vector2 } from "./Vector2";

export class Line2 {
    public point1: Vector2;
    public point2: Vector2;

    constructor(point1?: Vector2, point2?: Vector2) {
        this.point1 = point1;
        this.point2 = point2;
    }

    public GetCopy(): Line2 {
        return new Line2(this.point1.GetCopy(), this.point2.GetCopy());
    }

    public Set(point1: Vector2, point2: Vector2): Line2 {
        this.point1 = point1;
        this.point2 = point2;

        return this;
    }
}
