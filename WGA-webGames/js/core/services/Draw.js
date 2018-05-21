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
var Draw = /** @class */ (function () {
    function Draw() {
    }
    Draw.PI2 = function () { return 6.283185307179586476925286766559; };
    Draw.PI = function () { return 3.1415926535897932384626433832795; };
    Draw.prototype.SetCtx = function (ctx) {
        this.ctx = ctx;
    };
    //base figures
    Draw.prototype.Line = function (params) {
        this.line(params);
    };
    Draw.prototype.RectStroke = function (params) {
        this.rect(params, 'stroke');
    };
    Draw.prototype.RectFill = function (params) {
        this.rect(new StrokeRectParams(params, 0), 'fill');
    };
    Draw.prototype.CircleStroke = function (params) {
        this.arc(new StrokeArcParams(new FillArcParams(params, 0, 0), params.thickness), 'stroke');
    };
    Draw.prototype.CircleFill = function (params) {
        this.arc(new StrokeArcParams(new FillArcParams(params, 0, 0), 0), 'fill');
    };
    Draw.prototype.TextStroke = function (params) {
        this.drawText(params, "stroke");
    };
    Draw.prototype.TextFill = function (params) {
        this.drawText(params, "fill");
    };
    Draw.prototype.ArcStroke = function (params) {
        this.arc(params, 'stroke');
    };
    Draw.prototype.ArcFill = function (params) {
        this.arc(new StrokeArcParams(params, 0), 'fill');
    };
    //extended figures
    Draw.prototype.DrawZombie = function (position, angle, color1, color2, scale) {
        if (angle == null) {
            angle = 0;
        }
        if (scale == null) {
            scale = new Vector2(1, 1);
        }
        if (typeof scale == "number") {
            scale = new Vector2(scale, scale);
        }
        var params = {
            position: position,
            size: new Vector2(30, 50),
            origin: new Vector2(0, 0),
            color: color1,
            angle: angle,
            scale: scale
        };
        Setups.I.Draw.RectFill(params);
        params.position = position.ADD((new Vector2(12 * scale.X, 0)).RotateTo(angle));
        params.size = new Vector2(20, 20);
        params.color = color2;
        Setups.I.Draw.RectFill(params);
        params.size = new Vector2(15, 8);
        params.position = position.ADD((new Vector2(16 * scale.X, -25 * scale.Y)).RotateTo(angle));
        Setups.I.Draw.RectFill(params);
        params.position = position.ADD((new Vector2(16 * scale.X, 25 * scale.Y)).RotateTo(angle));
        Setups.I.Draw.RectFill(params);
    };
    //base figures privates
    Draw.prototype.line = function (params) {
        params.Normilize();
        this.ctx.save();
        this.ctx.strokeStyle = params.color.GetRgba();
        this.ctx.lineWidth = params.thickness;
        this.ctx.beginPath();
        this.ctx.moveTo(params.pointFrom.X, params.pointFrom.Y);
        this.ctx.lineTo(params.pointTo.X, params.pointTo.Y);
        this.ctx.stroke();
        this.ctx.restore();
    };
    Draw.prototype.rect = function (params, type) {
        params.Normilize();
        params.origin = params.origin.MUL(new Vector2(-1, -1));
        this.ctx.save();
        this.ctx.translate(params.position.X, params.position.Y);
        this.ctx.scale(params.scale.X, params.scale.Y);
        this.ctx.rotate(params.angle);
        var x = -(params.size.X / 2) + (params.size.X / 2) * params.origin.X;
        var y = -(params.size.Y / 2) + (params.size.Y / 2) * params.origin.Y;
        if (type == 'stroke') {
            this.ctx.lineWidth = params.thickness;
            this.ctx.strokeStyle = params.color.GetRgba();
            this.ctx.strokeRect(x, y, params.size.X, params.size.Y);
        }
        else if (type == 'fill') {
            this.ctx.fillStyle = params.color.GetRgba();
            this.ctx.fillRect(x, y, params.size.X, params.size.Y);
        }
        this.ctx.restore();
    };
    Draw.prototype.arc = function (params, type) {
        params.Normilize();
        params.origin = params.origin.MUL(new Vector2(-1, -1));
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(params.position.X, params.position.Y);
        this.ctx.scale(params.scale.X, params.scale.Y);
        var x = -params.radius * params.origin.X;
        var y = -params.radius * params.origin.Y;
        this.ctx.lineWidth = params.thickness;
        if (params.endAngle < params.startAngle) {
            params.endAngle = params.endAngle + params.startAngle;
            params.startAngle = params.endAngle - params.startAngle;
            params.endAngle = params.endAngle - params.startAngle;
        }
        this.ctx.arc(x, y, params.radius, params.startAngle, params.endAngle, false);
        if (type == 'stroke') {
            this.ctx.lineWidth = params.thickness;
            this.ctx.strokeStyle = params.color.GetRgba();
            this.ctx.stroke();
        }
        else if (type == 'fill') {
            this.ctx.fillStyle = params.color.GetRgba();
            this.ctx.fill();
        }
        this.ctx.restore();
    };
    Draw.prototype.textMeasure = function (params) {
        return this.drawText(params, "measure");
    };
    Draw.prototype.drawText = function (params, type) {
        params.Normilize();
        params.origin = params.origin.MUL(new Vector2(-1, -1));
        if (type != "measure") {
            //TODO!!
            var sizeX = this.textMeasure(params);
            var sizeY = params.fontSize;
            var x = (sizeX / 2) * params.origin.X;
            var y = -(sizeY / 2) + (sizeY / 2) * params.origin.Y;
        }
        this.ctx.save();
        this.ctx.translate(params.position.X, params.position.Y);
        this.ctx.scale(params.scale.X, params.scale.Y);
        this.ctx.rotate(params.angle);
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        this.ctx.font = params.fontSize + "px " + params.fontName;
        if (type == "fill") {
            this.ctx.fillStyle = params.color.GetRgba();
            this.ctx.fillText(params.str, x, y);
        }
        else if (type == "stroke") {
            this.ctx.strokeStyle = params.color.GetRgba();
            this.ctx.strokeText(params.str, x, y);
        }
        else if (type == "measure") {
            var res = this.ctx.measureText(params.str).width;
            this.ctx.restore();
            return res;
        }
        this.ctx.restore();
    };
    return Draw;
}());
// ===== Parameters containers stuff =====
var StandartParams = /** @class */ (function () {
    function StandartParams(params) {
        this.position = params.position;
        this.origin = params.origin;
        this.color = params.color;
        this.angle = params.angle;
        this.scale = params.scale;
    }
    StandartParams.prototype.Normilize = function () {
        if (this.position == null) {
            throw "position can not be null";
        }
        if (this.origin == null) {
            this.origin = new Vector2(0, 0);
        }
        if (this.color == null) {
            this.color = new Color4(0, 0, 0, 1);
        }
        if (this.angle == null) {
            this.angle = 0;
        }
        if (this.scale == null) {
            this.scale = new Vector2(1, 1);
        }
        if (typeof this.scale == "number") {
            this.scale = new Vector2(this.scale, this.scale);
        }
    };
    return StandartParams;
}());
var FillRectParams = /** @class */ (function (_super) {
    __extends(FillRectParams, _super);
    function FillRectParams(params, size) {
        var _this = _super.call(this, params) || this;
        _this.size = size;
        return _this;
    }
    FillRectParams.prototype.Normilize = function () {
        _super.prototype.Normilize.call(this);
        if (this.size == null) {
            this.size = new Vector2(0, 0);
        }
    };
    return FillRectParams;
}(StandartParams));
var StrokeRectParams = /** @class */ (function (_super) {
    __extends(StrokeRectParams, _super);
    function StrokeRectParams(params, thickness) {
        var _this = _super.call(this, params, params.size) || this;
        _this.thickness = thickness;
        return _this;
    }
    StrokeRectParams.prototype.Normilize = function () {
        _super.prototype.Normilize.call(this);
        if (this.thickness == null) {
            this.thickness = 1;
        }
    };
    return StrokeRectParams;
}(FillRectParams));
var FillCircleParams = /** @class */ (function (_super) {
    __extends(FillCircleParams, _super);
    function FillCircleParams(params, radius) {
        var _this = _super.call(this, params) || this;
        _this.radius = radius;
        return _this;
    }
    FillCircleParams.prototype.Normilize = function () {
        _super.prototype.Normilize.call(this);
        if (this.radius == null) {
            throw "radius can not be null";
        }
    };
    return FillCircleParams;
}(StandartParams));
var StrokeCircleParams = /** @class */ (function (_super) {
    __extends(StrokeCircleParams, _super);
    function StrokeCircleParams(params, thickness) {
        var _this = _super.call(this, params, params.radius) || this;
        _this.thickness = thickness;
        return _this;
    }
    StrokeCircleParams.prototype.Normilize = function () {
        _super.prototype.Normilize.call(this);
        if (this.thickness == null) {
            this.thickness = 1;
        }
    };
    return StrokeCircleParams;
}(FillCircleParams));
var FillArcParams = /** @class */ (function (_super) {
    __extends(FillArcParams, _super);
    function FillArcParams(params, startAngle, endAngle) {
        var _this = _super.call(this, params, params.radius) || this;
        _this.startAngle = startAngle;
        _this.endAngle = endAngle;
        return _this;
    }
    FillArcParams.prototype.Normilize = function () {
        _super.prototype.Normilize.call(this);
        if (this.startAngle == null) {
            this.startAngle = 0;
        }
        if (this.endAngle == null) {
            this.endAngle = Draw.PI();
        }
    };
    return FillArcParams;
}(FillCircleParams));
var StrokeArcParams = /** @class */ (function (_super) {
    __extends(StrokeArcParams, _super);
    function StrokeArcParams(params, thickness) {
        var _this = _super.call(this, params, params.startAngle, params.endAngle) || this;
        _this.thickness = thickness;
        return _this;
    }
    StrokeArcParams.prototype.Normilize = function () {
        _super.prototype.Normilize.call(this);
        if (this.thickness == null) {
            this.thickness = 1;
        }
    };
    return StrokeArcParams;
}(FillArcParams));
var TextParams = /** @class */ (function (_super) {
    __extends(TextParams, _super);
    function TextParams(params, fontName, fontSize) {
        return _super.call(this, params) || this;
    }
    TextParams.prototype.Normilize = function () {
        _super.prototype.Normilize.call(this);
        if (this.str == null) {
            throw "str can not be null";
        }
        if (this.fontName == null) {
            this.fontName = "serif";
        }
        if (this.fontSize == null) {
            this.fontSize = 10;
        }
    };
    return TextParams;
}(StandartParams));
var LineParams = /** @class */ (function () {
    function LineParams() {
    }
    LineParams.prototype.Normilize = function () {
        if (this.pointFrom == null) {
            throw "pointFrom can not be null";
        }
        if (this.pointTo == null) {
            throw "pointTo can not be null";
        }
        if (this.thickness == null) {
            this.thickness = 1;
        }
        if (this.color == null) {
            this.color = new Color4(0, 0, 0, 1);
        }
    };
    return LineParams;
}());
//# sourceMappingURL=Draw.js.map