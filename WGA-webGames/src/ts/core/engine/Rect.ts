import { Vector2 } from "./Vector2";

export class Rect {
    public Left: number;
    public Top: number;
    public Right: number;
    public Bottom: number;

    constructor(left: number, top: number, right: number, bottom: number) {
        this.Left = left;
        this.Top = top;
        this.Right = right;
        this.Bottom = bottom;
    }

    public get Width(): number {
        return this.Right - this.Left;
    }

    public get Height(): number {
        return this.Bottom - this.Top;
    }

    public GetCenter(): Vector2 {
        return new Vector2(this.Left + this.Width / 2, this.Top + this.Height / 2)
    }

    public GetSize(): Vector2 {
        return new Vector2(this.Width, this.Height)
    }

    public SetPositionFromCenter(position: Vector2): void {
        var width = this.Width;
        var height = this.Height;

        this.Left = position.X - width / 2;
        this.Right = this.Left + width;
        this.Top = position.Y - height / 2;
        this.Bottom = this.Top + height;
    }

    public static FromVectors(position: Vector2, size: Vector2): Rect {
        return new Rect(
            position.X,
            position.Y,
            position.X + size.X,
            position.Y + size.Y
        );
    }

    public static FromCircle(position: Vector2, radius: number): Rect {
        return new Rect(
            position.X - radius,
            position.Y - radius,
            position.X + radius,
            position.Y + radius
        );
    }
}
