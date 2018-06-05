﻿module WGAAppModelue {
    'use strict';

    export class WGAApp implements IUpdateable, IDrawable {
        private pause: boolean;
        private allGames: WGAGameContainer[];
        private currentGame: WGAGameContainer;
        private menu: MainMenu;

        constructor() {
            this.pause = true;

            this.allGames = [
                <WGAGameContainer>{
                    Name: "zombieShoter",
                    Game: new ZombieShoter()
                }, <WGAGameContainer>{
                    Name: "coreDefence",
                    Game: new CoreDefence()
                }];

            this.menu = new MainMenu();
        }

        public SelectGameByName(name: string): void {
            var games = this.allGames.filter(x => x.Name == name);

            if (games.length > 0) {
                this.currentGame = games[0];
                this.currentGame.Game.Init();
                this.pause = false;
            }
            else {
                console.error("cant find game by name");
            }
        }

        public SelectGameByObj(game: WGAGameContainer): void {
            this.currentGame = game;
            this.currentGame.Game.Init();
            this.pause = false;
        }

        public Update(timeDelta: number): void {
            if (this.pause == true) {
                this.menu.Update(timeDelta);
            }

            if (this.currentGame != null && this.pause == false) {
                this.currentGame.Game.Update(timeDelta);
            }
        }
        public Draw(ctx: any): void {
            if (this.pause == true) {
                this.menu.Draw(ctx);
            }

            if (this.currentGame != null && this.pause == false) {
                this.currentGame.Game.Draw(ctx);
            }
        }
    }
}