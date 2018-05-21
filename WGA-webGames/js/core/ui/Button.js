var Button = /** @class */ (function () {
    function Button() {
    }
    Button.prototype.Init = function () {
        var _this = this;
        Setups.I.Input.OnInputEvent(function () {
            _this.Click();
        }, this.name + '-OnClick', EventsTypes.leftMouseClick);
    };
    Button.prototype.Dispose = function () {
    };
    Button.prototype.Update = function (timeDelta) {
    };
    Button.prototype.Draw = function (ctx) {
        Setups.I.Draw.RectFill({ position: this.position, size: this.size, color: this.color });
        Setups.I.Draw.TextFill({ str: this.text, position: this.position, color: Color4.Black(), fontSize: 14 });
    };
    //-------------
    Button.prototype.Click = function () {
        if (Setups.I.Geometry.IsPointInRect(Setups.I.Input.GetMousePosition(), Rect.FromVectors(this.position.SUB(this.size.DIV(2)), this.size))) {
            if (this.onClick != null) {
                this.onClick();
            }
        }
    };
    Button.GetButton = function (name, text, onClick, position, size, color, fontSize) {
        if (name.name != null) {
            text = name.text;
            onClick = name.onClick;
            position = name.position;
            size = name.size;
            color = name.color;
            fontSize = name.fontSize;
            name = name.name;
        }
        var btn = new Button();
        btn.name = name;
        btn.text = text;
        btn.onClick = onClick;
        btn.position = position;
        btn.size = size;
        btn.color = color;
        btn.fontSize = fontSize;
        btn.Init();
        return btn;
    };
    return Button;
}());
//# sourceMappingURL=Button.js.map