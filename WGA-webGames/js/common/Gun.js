var Gun = /** @class */ (function () {
    function Gun(position, rotationSpeed) {
        this.Power = 10;
        this.Direction = new Vector2(-1, 0);
        this.Position = position;
        this.Bullets = [];
        this.Reload = 0;
        this.AngleControll = new Value(0, rotationSpeed);
    }
    Gun.prototype.Update = function (timeDelta) {
        var toMouseDir = Setups.I.Input.MousePos.SUB(this.Position).Normalize();
        var delta = Vector2.AngleBetween(this.Direction, toMouseDir);
        this.AngleControll.GoToDelta(delta);
        this.AngleControll.Update(timeDelta);
        this.Direction = Vector2.Left().RotateTo(this.AngleControll.GetVal());
        if (this.Reload > 0) {
            this.Reload -= timeDelta;
        }
        for (var item in this.Bullets) {
            this.Bullets[item].Update(timeDelta);
        }
    };
    Gun.prototype.Draw = function (ctx) {
        this.drawBullets(ctx);
        this.drawGun(ctx);
    };
    //-------------
    Gun.prototype.drawBullets = function (ctx) {
        for (var item in this.Bullets) {
            this.Bullets[item].Draw(ctx);
        }
    };
    Gun.prototype.drawGun = function (ctx) {
        Setups.I.Draw.RectFill({ position: this.Position, size: new Vector2(50, 10), origin: new Vector2(1, 0), color: Color4.ColorFromHex('#00FF00'), angle: this.AngleControll.GetVal() });
        Setups.I.Draw.RectFill({ position: this.Position, size: new Vector2(5, 5), origin: new Vector2(0, 0), color: Color4.ColorFromHex('#FFFF00') });
    };
    Gun.prototype.Shoot = function (point) {
        if (this.Reload <= 0) {
            this.Reload = 0.3;
            var pos = this.Position;
            var power = 10;
            var speed = 1000 + Setups.I.Utils.RandF(-1, 1);
            this.Bullets.push(new Bullet(pos.ADD(this.Direction.MUL(40)), this.Direction, power, speed));
        }
    };
    return Gun;
}());
//# sourceMappingURL=Gun.js.map