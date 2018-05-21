var WGAApp = /** @class */ (function () {
    function WGAApp() {
        this.pause = true;
        this.allGames = [
            {
                Name: "zombieShoter",
                Game: new ZombieShoter()
            }, {
                Name: "coreDefence",
                Game: new CoreDefence()
            }
        ];
        this.menu = new MainMenu();
    }
    WGAApp.prototype.SelectGameByName = function (name) {
        var games = this.allGames.filter(function (x) { return x.Name == name; });
        if (games.length > 0) {
            this.currentGame = games[0];
            this.currentGame.Game.Init();
            this.pause = false;
        }
        else {
            console.error("cant find game by name");
        }
    };
    WGAApp.prototype.SelectGameByObj = function (game) {
        this.currentGame = game;
        this.currentGame.Game.Init();
        this.pause = false;
    };
    WGAApp.prototype.Update = function (timeDelta) {
        if (this.pause == true) {
            this.menu.Update(timeDelta);
        }
        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.Update(timeDelta);
        }
    };
    WGAApp.prototype.Draw = function (ctx) {
        if (this.pause == true) {
            this.menu.Draw(ctx);
        }
        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.Draw(ctx);
        }
    };
    return WGAApp;
}());
//# sourceMappingURL=App.js.map