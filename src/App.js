class App {
    //menu
    //currentGame

    //allGames

    constructor() {
        this.allGames = [{
            name: "zombieShoter",
            game: new ZombieShoter()
        }];

        this.menu = new MainMenu();


        //this.selectGame(this.allGames[0]);
    }

    selectGameByName(name) {
        var games = this.allGames[0].filter(x => x.name = name);

        if (games.length > 0) {
            this.currentGame = games[0];
            this.currentGame.game.init();
        }
        else {
            console.error("cant find game by name");
        }
    }

    selectGameByObj(game) {
        this.currentGame = game;
        this.currentGame.game.init();
    }
    update(timeDelta) {
        this.menu.update(timeDelta);

        if (this.currentGame != null) {
            this.currentGame.game.update(timeDelta);
        }
    }
    draw(ctx) {
        this.menu.draw(ctx);

        if (this.currentGame != null) {
            this.currentGame.game.draw(ctx);
        }
    }
}