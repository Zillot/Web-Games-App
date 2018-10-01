module WGAAppModule {
    'use strict';

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

        public GetCenter() {
            return new Vector2(this.Left + (this.Right - this.Left) / 2, this.Top + (this.Bottom - this.Top) / 2)
        }

        public GetSize() {
            return new Vector2(this.Right - this.Left, this.Bottom - this.Top)
        }

        public SetPositionFromCenter(position: Vector2) {
            var xDelta = this.Left - position.X;
            var YDelta = this.Top - position.Y;

            this.Left += xDelta
            this.Right += xDelta
            this.Top += YDelta
            this.Bottom += YDelta
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
}