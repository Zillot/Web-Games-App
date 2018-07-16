module WGAAppModelue {
    'use strict';

    export class CastleDefence implements IWGAGame {
        private game: Game;

        constructor() { }

        public Init(): void {
            this.game = new Game(20, 100);

            this.game.NextLevelEvent = () => { };
        }

        public Update(timeDelta: number): void {
           
        }
        public Draw(): void {
            this.game.Draw();
        }
        //-------------
        public HitPlayer(power: number): void {
            this.game.Hit(power);
        }
    }
}