class App {
    //menu
    //currentGame

    //allGames

    //pause

    constructor() {
        this.pause = true;

        this.allGames = [{
            name: "zombieShoter",
            game: new ZombieShoter()
        }];

        this.menu = new MainMenu();
    }

    selectGameByName(name) {
        var games = this.allGames.filter(x => x.name = name);

        if (games.length > 0) {
            this.currentGame = games[0];
            this.currentGame.game.init();
            this.pause = false;
        }
        else {
            console.error("cant find game by name");
        }
    }

    selectGameByObj(game) {
        this.pause = false;

        this.currentGame = game;
        this.currentGame.game.init();
    }
    update(timeDelta) {
        if (this.pause == true) {
            this.menu.update(timeDelta);
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.game.update(timeDelta);
        }
    }
    draw(ctx) {
        if (this.pause == true) {
            this.menu.draw(ctx);
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.game.draw(ctx);
        }
    }
}