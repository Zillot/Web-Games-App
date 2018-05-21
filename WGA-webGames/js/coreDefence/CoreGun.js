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
var CoreGun = /** @class */ (function (_super) {
    __extends(CoreGun, _super);
    function CoreGun(rotationSpeed) {
        var _this = _super.call(this, Setups.I.Center, rotationSpeed) || this;
        _this.Width = 1;
        return _this;
    }
    CoreGun.prototype.drawGun = function (ctx) {
        var value = this.AngleControll.GetVal() + Math.PI;
        var color1 = Color4.ColorFromHex('#7777FF');
        var color2 = Color4.ColorFromHex('#7777FF');
        Setups.I.Draw.CircleFill({ position: this.Position, radius: 30, color: color1.GetTransparent(0.2) });
        Setups.I.Draw.CircleFill({ position: this.Position, radius: 10, color: color1.GetTransparent(0.5) });
        Setups.I.Draw.CircleFill({ position: this.Position, radius: 6, color: color1.GetTransparent(0.5) });
        var forward = Vector2.Left().RotateTo(value - Math.PI);
        var side = Vector2.Left().RotateTo(value - Math.PI + Math.PI / 2);
        var point = this.Position.ADD(forward.MUL(54));
        Setups.I.Draw.ArcFill({ position: this.Position, radius: 50, startAngle: value + 0.09, endAngle: value + this.Width / 2, color: color2 });
        Setups.I.Draw.ArcFill({ position: this.Position, radius: 50, startAngle: value - 0.09, endAngle: value - this.Width / 2, color: color2 });
        Setups.I.Draw.Line({ pointFrom: point, pointTo: point.ADD(side.MUL(4)).ADD(forward.MUL(-4)), thickness: 1, color: color2 });
        Setups.I.Draw.Line({ pointFrom: point, pointTo: point.ADD(side.MUL(-4)).ADD(forward.MUL(-4)), thickness: 1, color: color2 });
    };
    //-------
    CoreGun.prototype.CoveredByShield = function (angle) {
        var value = Vector2.Left().AngleTo(this.Direction);
        return angle > value - this.Width / 2 && angle < value + this.Width / 2;
    };
    return CoreGun;
}(Gun));
//# sourceMappingURL=CoreGun.js.map