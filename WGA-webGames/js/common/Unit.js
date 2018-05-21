var Unit = /** @class */ (function () {
    function Unit(position, direction, hp, speed, hitDistnace) {
        this.Position = position;
        this.Direction = direction;
        this.MaxHp = hp;
        this.Hp = hp;
        this.Speed = speed;
        this.HitDistance = hitDistnace;
    }
    Unit.prototype.Update = function (timeDelta) {
        this.Position = this.Position.ADD(this.Direction.MUL(this.Speed * timeDelta));
    };
    Unit.prototype.Draw = function (ctx) {
        Setups.I.Draw.CircleFill({ position: this.Position, radius: 2 });
    };
    //-------------
    Unit.prototype.TryHit = function (bullet) {
        if (Vector2.Distance(this.Position, bullet.Position) < this.HitDistance + bullet.HitDistance) {
            this.Hit(bullet.Power);
            return true;
        }
        return false;
    };
    Unit.prototype.Hit = function (power) {
        this.Hp -= power;
        if (this.Hp < 0) {
            this.Hp = 0;
        }
    };
    return Unit;
}());
//# sourceMappingURL=Unit.js.map