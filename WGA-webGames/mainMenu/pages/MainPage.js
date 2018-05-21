class MainPage {
    //buttons

    constructor() {
        this.buttons = [];

        this.buttons.push(Button.getButton({
            name: "SelectGame1Btn",
            text: "Play Zombie Shoter",
            onClick: function()
            {
                Setups.app.selectGameByName('zombieShoter')
            },
            position: new Vector2(Setups.center.X, 350),
            size: new Vector2(200, 40),
            color: Color4.White()
        }));
        this.buttons.push(Button.getButton({
            name: "SelectGame2Btn",
            text: "Play Core Defence",
            onClick: function()
            {
                Setups.app.selectGameByName('coreDefence')
            },
            position: new Vector2(Setups.center.X, 400),
            size: new Vector2(200, 40),
            color: Color4.White()
        }));
        this.buttons.push(Button.getButton({
            name: "EsternEqq1Btn",
            text: "Blow up a nuclear bomb",
            onClick: function() { },
            position: new Vector2(Setups.center.X, 450),
            size: new Vector2(200, 40),
            color: Color4.White()
        }));
    }

    dispose() {
        for (var buttonKey in this.buttons) {
            var button = this.buttons[buttonKey];
            button.dispose();
        }
    }

    update(timeDelta) {
        for (var buttonKey in this.buttons) {
            var button = this.buttons[buttonKey];
            button.update(timeDelta);
        }
    }

    draw(ctx) {
        Setups.draw.fillRect(new Vector2(0, 0), new Vector2(Setups.windowWidth, Setups.windowHeight), new Vector2(-1, -1), Color4.Black().getTransparent(0.5));

        Setups.draw.textFill('Web games app', new Vector2(Setups.center.X, 100), Color4.White(), null, 50, new Vector2(0, 0));
        Setups.draw.textFill('Main menu', new Vector2(Setups.center.X, 150), Color4.White(), null, 30, new Vector2(0, 0));

        for (var buttonKey in this.buttons) {
            var button = this.buttons[buttonKey];
            button.draw(ctx);
        }
    }
}