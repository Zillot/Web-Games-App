var Geometry = /** @class */ (function () {
    function Geometry() {
    }
    Geometry.prototype.IsPointInRect = function (point, rect) {
        var onX = rect.Left < point.X && rect.Right > point.X;
        var onY = rect.Top < point.Y && rect.Bottom > point.Y;
        return onX && onY;
    };
    return Geometry;
}());
//# sourceMappingURL=Geometry.js.map