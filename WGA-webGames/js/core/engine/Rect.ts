class Rect {
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

    public static FromVectors(position: Vector2, size: Vector2): Rect {
        return new Rect(
            position.X,
            position.Y,
            position.X + size.X,
            position.Y + size.Y,
        );
    }
 }