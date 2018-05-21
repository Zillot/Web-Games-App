var Color4 = /** @class */ (function () {
    function Color4(R, G, B, A) {
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    }
    Color4.prototype.GetInvertColor = function () {
        return new Color4(255 - this.R, 255 - this.G, 255 - this.B, this.A);
    };
    Color4.prototype.GetRgba = function () {
        return 'rgba(' + this.R + ', ' + this.G + ', ' + this.B + ', ' + this.A + ')';
    };
    Color4.prototype.GetTransparent = function (opacity) {
        return new Color4(this.R, this.G, this.B, opacity);
    };
    Color4.ColorFromHex = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return new Color4(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1);
    };
    Color4.White = function () {
        if (!Color4.white) {
            Color4.white = new Color4(255, 255, 255, 1);
        }
        return Color4.white;
    };
    Color4.Black = function () {
        if (!Color4.black) {
            Color4.black = new Color4(0, 0, 0, 1);
        }
        return Color4.black;
    };
    Color4.Gray = function () {
        if (!Color4.gray) {
            Color4.gray = new Color4(100, 100, 100, 1);
        }
        return Color4.gray;
    };
    Color4.Red = function () {
        if (!Color4.red) {
            Color4.red = new Color4(255, 64, 0, 1);
        }
        return Color4.red;
    };
    Color4.Orange = function () {
        if (Color4.orange == null) {
            Color4.orange = new Color4(255, 128, 1, 1);
        }
        return Color4.orange;
    };
    Color4.Yellow = function () {
        if (Color4.yellow == null) {
            Color4.yellow = new Color4(255, 255, 0, 1);
        }
        return Color4.yellow;
    };
    Color4.Green = function () {
        if (Color4.green == null) {
            Color4.green = new Color4(64, 255, 0, 1);
        }
        return Color4.green;
    };
    Color4.Cyan = function () {
        if (Color4.cyan == null) {
            Color4.cyan = new Color4(0, 255, 255, 1);
        }
        return Color4.cyan;
    };
    Color4.Blue = function () {
        if (Color4.blue == null) {
            Color4.blue = new Color4(0, 0, 255, 1);
        }
        return Color4.blue;
    };
    Color4.Violet = function () {
        if (Color4.violet == null) {
            Color4.violet = new Color4(191, 0, 255, 1);
        }
        return Color4.violet;
    };
    Color4.Purple = function () {
        if (Color4.purple == null) {
            Color4.purple = new Color4(255, 0, 191, 1);
        }
        return Color4.purple;
    };
    Color4.Tomato = function () {
        if (Color4.tomato == null) {
            Color4.tomato = new Color4(230, 46, 0, 1);
        }
        return Color4.tomato;
    };
    return Color4;
}());
//# sourceMappingURL=Color4.js.map