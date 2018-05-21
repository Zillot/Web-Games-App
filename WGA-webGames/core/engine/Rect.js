class Rect {
    //Left
    //Top
    //Right
    //Bottom

    constructor(Left, Top, Right, Bottom) {
        this.Left = Left;
        this.Top = Top;
        this.Right = Right;
        this.Bottom = Bottom;
    }

    static fromVectors(position, size) {
        return new Rect(
            position.X,
            position.Y,
            position.X + size.X,
            position.Y + size.Y,
        );
    }
 }