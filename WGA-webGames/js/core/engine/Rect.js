var Rect = /** @class */ (function () {
    function Rect(left, top, right, bottom) {
        this.Left = left;
        this.Top = top;
        this.Right = right;
        this.Bottom = bottom;
    }
    Rect.FromVectors = function (position, size) {
        return new Rect(position.X, position.Y, position.X + size.X, position.Y + size.Y);
    };
    return Rect;
}());
//# sourceMappingURL=Rect.js.map