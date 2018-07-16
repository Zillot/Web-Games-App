module WGAAppModelue {
    'use strict';

    export class CastleDefence implements IWGAGame {
        private game: Game;
        private castle: Castle;

        constructor() { }

        public Init(): void {
            this.game = new Game(20, 100);
            this.castle = new Castle(new Vector2(Setups.I.WindowWidth / 2, Setups.I.WindowHeight), 100);

            this.game.NextLevelEvent = () => { };
        }

        public Update(timeDelta: number): void {
            this.game.Update(timeDelta);
            this.castle.Update(timeDelta);
        }
        public Draw(): void {
            this.game.Draw();
            this.castle.Draw();
        }
        //-------------
        public HitPlayer(power: number): void {
            this.game.Hit(power);
        }
    }
}