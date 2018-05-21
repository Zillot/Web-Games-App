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
var Zombie = /** @class */ (function (_super) {
    __extends(Zombie, _super);
    function Zombie(position, hp, speed) {
        var _this = _super.call(this, position, new Vector2(1, 0), hp, speed, 30) || this;
        _this.Color = Setups.I.Utils.RandColor();
        _this.Power = 20;
        _this.Angle = Vector2.AngleAbsBetween(Vector2.Right(), _this.Direction);
        return _this;
    }
    Zombie.prototype.Draw = function (ctx) {
        var scale = 0.8 + (this.Hp / this.MaxHp) * 0.2;
        Setups.I.Draw.DrawZombie(this.position, this.Angle, this.Color, this.Color.GetInvertColor(), scale);
    };
    return Zombie;
}(Unit));
//# sourceMappingURL=Zombie.js.map