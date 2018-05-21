var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(position, hp, speed) {
        var _this = _super.call(this, position, Setups.I.Center.SUB(position).Normalize(), hp, speed, 10) || this;
        _this.Color = Setups.I.Utils.RandColor();
        _this.Power = 20;
        _this.Angle = Vector2.AngleAbsBetween(Vector2.Right(), _this.Direction);
        _this.MinDistance = 100;
        _this.MaxDistance = 600;
        _this.DistanceToDash = 110;
        _this.Radius = 3;
        return _this;
    }
    Enemy.prototype.Update = function (timeDelta) {
        _super.prototype.Update.call(this, timeDelta);
        var toCenter = Vector2.Distance(this.Position, Setups.I.Center);
        var toProcess = toCenter - this.MinDistance;
        if (toProcess > this.MaxDistance) {
            toProcess = this.MaxDistance;
        }
        this.Speed = ((toProcess / this.MaxDistance) * this.MaxDistance);
        if (this.Speed < 10) {
            this.Speed = 10;
        }
        if (toCenter < this.DistanceToDash) {
            this.Speed = 1500;
        }
    };
    Enemy.prototype.Draw = function (ctx) {
        Setups.I.Draw.CircleFill({ position: this.Position, radius: this.Radius * 2, color: this.Color });
    };
    return Enemy;
}(Unit));
//# sourceMappingURL=Enemy.js.map