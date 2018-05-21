var MainPage = /** @class */ (function () {
    function MainPage() {
        this.Buttons = [];
        this.Buttons.push(Button.GetButton({
            name: "SelectGame1Btn",
            text: "Play Zombie Shoter",
            onClick: function () {
                Setups.I.App.SelectGameByName('zombieShoter');
            },
            position: new Vector2(Setups.I.Center.X, 350),
            size: new Vector2(200, 40),
            color: Color4.White()
        }));
        this.Buttons.push(Button.GetButton({
            name: "SelectGame2Btn",
            text: "Play Core Defence",
            onClick: function () {
                Setups.I.App.SelectGameByName('coreDefence');
            },
            position: new Vector2(Setups.I.Center.X, 400),
            size: new Vector2(200, 40),
            color: Color4.White()
        }));
        this.Buttons.push(Button.GetButton({
            name: "EsternEqq1Btn",
            text: "Blow up a nuclear bomb",
            onClick: function () { },
            position: new Vector2(Setups.I.Center.X, 450),
            size: new Vector2(200, 40),
            color: Color4.White()
        }));
    }
    MainPage.prototype.Dispose = function () {
        for (var buttonKey in this.Buttons) {
            var button = this.Buttons[buttonKey];
            button.Dispose();
        }
    };
    MainPage.prototype.Update = function (timeDelta) {
        for (var buttonKey in this.Buttons) {
            var button = this.Buttons[buttonKey];
            button.Update(timeDelta);
        }
    };
    MainPage.prototype.Draw = function (ctx) {
        Setups.I.Draw.RectFill({ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight), origin: new Vector2(-1, -1), color: Color4.Black().GetTransparent(0.5) });
        Setups.I.Draw.TextFill({ str: 'Web games app', position: new Vector2(Setups.I.Center.X, 100), color: Color4.White(), fontSize: 50, origin: new Vector2(0) });
        Setups.I.Draw.TextFill({ str: 'Main menu', position: new Vector2(Setups.I.Center.X, 150), color: Color4.White(), fontSize: 30, origin: new Vector2(0) });
        for (var buttonKey in this.Buttons) {
            var button = this.Buttons[buttonKey];
            button.Draw(ctx);
        }
    };
    return MainPage;
}());
//# sourceMappingURL=MainPage.js.map