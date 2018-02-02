class MainPage {
    //buttons

    constructor() { }

    init() {
        this.buttons = [];

        this.buttons.push(Button.getButton(
            "SelectGame",
            function() { Setups.app.selectGame('zombieShoter') },
            new Vector2(Setups.windowWidth / 2, 100),
            new Vector2(100, 100))
        );
    }

    update(timeDelta) {
        for (var buttonKey in this.buttons) {
            var button = this.buttons[buttonKey];
            button.update(timeDelta);
        }
    }

    draw(ctx) {
        Setups.draw.rect(new Vector2(0, 0), new Vector2(Setups.windowWidth, Setups.windowHeight), new Vector2(0, 0), Color4.Black().);

        for (var buttonKey in this.buttons) {
            var button = this.buttons[buttonKey];
            button.draw(ctx);
        }
    }
}