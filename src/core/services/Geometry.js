class Geometry {
    contructor() {

    }

    static IsPointInRect(point, rect) {
        var onX = rect.Left < point.X && rect.Right > point.X;
        var onY = rect.Top < point.Y && rect.Bottom > point.Y;

        return onX && onY;
    }
}
