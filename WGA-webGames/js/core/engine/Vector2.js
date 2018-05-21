var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        var xVal = x;
        if (y == null && x == null) {
            //empty constructor
        }
        if (y == null) {
            this.X = xVal;
            this.Y = xVal;
        }
        else {
            this.X = xVal;
            this.Y = y;
        }
    }
    Vector2.prototype.Set = function (x, y) {
        var xVal = x;
        if (y == null) {
            this.X = xVal;
            this.Y = xVal;
        }
        else {
            this.X = xVal;
            this.Y = y;
        }
        return this;
    };
    Vector2.prototype.ADDE = function (v2) {
        var v = Vector2.ADD(this, v2);
        this.Set(v.X, v.Y);
        return this;
    };
    Vector2.prototype.SUBE = function (v2) {
        var v = Vector2.SUB(this, v2);
        this.Set(v.X, v.Y);
        return this;
    };
    Vector2.prototype.MULE = function (v2) {
        var v = Vector2.MUL(this, v2);
        this.Set(v.X, v.Y);
        return this;
    };
    Vector2.prototype.DIVE = function (v2) {
        var v = Vector2.DIV(this, v2);
        this.Set(v.X, v.Y);
        return this;
    };
    Vector2.prototype.DOT = function (v2) {
        return Vector2.DOT(this, v2);
    };
    Vector2.prototype.DET = function (v2) {
        return Vector2.DET(this, v2);
    };
    Vector2.prototype.ADD = function (v2) {
        return Vector2.ADD(this, v2);
    };
    Vector2.prototype.SUB = function (v2) {
        return Vector2.SUB(this, v2);
    };
    Vector2.prototype.MUL = function (v2) {
        return Vector2.MUL(this, v2);
    };
    Vector2.prototype.DIV = function (v2) {
        return Vector2.DIV(this, v2);
    };
    Vector2.prototype.Normalize = function () {
        var v = Vector2.Normalize(this);
        this.Set(v.X, v.Y);
        return this;
    };
    Vector2.prototype.Length = function () {
        return Vector2.Length(this);
    };
    Vector2.prototype.RotateTo = function (angle) {
        var v = Vector2.GetRotated(this, angle);
        this.Set(v.X, v.Y);
        return this;
    };
    Vector2.prototype.AngleTo = function (v2) {
        return Vector2.AngleBetween(this, v2);
    };
    Vector2.prototype.AngleAbsTo = function (v2) {
        return Vector2.AngleAbsBetween(this, v2);
    };
    Vector2.prototype.Angle = function (v2) {
        return Vector2.Angle(this);
    };
    Vector2.prototype.AngleAbs = function () {
        return Vector2.AngleAbs(this);
    };
    Vector2.DOT = function (v1, v2) {
        return v1.X * v2.X + v1.Y * v2.Y;
    };
    Vector2.DET = function (v1, v2) {
        return v1.X * v2.Y - v2.X * v1.Y;
    };
    Vector2.ADD = function (v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X + v2, v1.Y + v2);
        }
        return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
    };
    Vector2.SUB = function (v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X - v2, v1.Y - v2);
        }
        return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
    };
    Vector2.MUL = function (v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X * v2, v1.Y * v2);
        }
        return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
    };
    Vector2.DIV = function (v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X / v2, v1.Y / v2);
        }
        return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
    };
    Vector2.Normalize = function (v) {
        var len = v.Length();
        return new Vector2(v.X / len, v.Y / len);
    };
    Vector2.Distance = function (v1, v2) {
        var v = new Vector2(v1.X - v2.X, v1.Y - v2.Y);
        return v.Length();
    };
    Vector2.Length = function (v) {
        return Math.abs(Math.sqrt(v.X * v.X + v.Y * v.Y));
    };
    Vector2.GetRotated = function (v1, angle) {
        var v = new Vector2(v1);
        v.X = Math.cos(angle) * v1.X - Math.sin(angle) * v1.Y;
        v.Y = Math.sin(angle) * v1.X + Math.cos(angle) * v1.Y;
        return v;
    };
    //from -PI to PI
    Vector2.AngleBetween = function (v1, v2) {
        return Math.atan2(v1.DET(v2), v1.DOT(v2));
    };
    //from 0 to 2PI
    Vector2.AngleAbsBetween = function (v1, v2) {
        var ang = Vector2.AngleBetween(v1, v2);
        if (ang < 0) {
            return Math.PI + Math.PI - Math.abs(ang);
        }
        return ang;
    };
    Vector2.Angle = function (v1) {
        return Vector2.AngleBetween(v1, Vector2.Up());
    };
    Vector2.AngleAbs = function (v1) {
        return Vector2.AngleAbsBetween(v1, Vector2.Up());
    };
    Vector2.Up = function () {
        if (!Vector2.up) {
            Vector2.up = new Vector2(0, -1);
        }
        return Vector2.up;
    };
    Vector2.Upright = function () {
        if (!Vector2.upright) {
            Vector2.upright = new Vector2(1, -1).Normalize();
        }
        return Vector2.upright;
    };
    Vector2.Right = function () {
        if (!Vector2.right) {
            Vector2.right = new Vector2(1, 0);
        }
        return Vector2.right;
    };
    Vector2.Rightdown = function () {
        if (!Vector2.rightdown) {
            Vector2.rightdown = new Vector2(1, 1).Normalize();
        }
        return Vector2.rightdown;
    };
    Vector2.Down = function () {
        if (!Vector2.down) {
            Vector2.down = new Vector2(0, 1);
        }
        return Vector2.down;
    };
    Vector2.Downleft = function () {
        if (!Vector2.downleft) {
            Vector2.downleft = new Vector2(-1, 1).Normalize();
        }
        return Vector2.downleft;
    };
    Vector2.Left = function () {
        if (!Vector2.left) {
            Vector2.left = new Vector2(-1, 0);
        }
        return Vector2.left;
    };
    Vector2.Leftup = function () {
        if (!Vector2.leftup) {
            Vector2.leftup = new Vector2(-1, -1).Normalize();
        }
        return Vector2.leftup;
    };
    return Vector2;
}());
//# sourceMappingURL=Vector2.js.map