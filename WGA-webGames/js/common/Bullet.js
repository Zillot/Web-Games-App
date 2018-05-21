var Bullet = /** @class */ (function () {
    function Bullet(position, direction, power, speed) {
        this.Position = position;
        this.Direction = direction;
        this.Power = power;
        this.Speed = speed;
        this.HitDistance = 3;
    }
    Bullet.prototype.Update = function (timeDelta) {
        this.Position = this.Position.ADD(this.Direction.MUL(this.Speed * timeDelta));
    };
    Bullet.prototype.Draw = function (ctx) {
        Setups.I.Draw.RectFill({ position: this.Position, size: new Vector2(5, 5), color: Color4.Black() });
    };
    return Bullet;
}());
//# sourceMappingURL=Bullet.js.map