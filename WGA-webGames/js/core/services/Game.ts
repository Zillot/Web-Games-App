module WGAAppModule {
    'use strict';

    export class Game {
        private level: number;
        private scoreGoal: number;
        private scoreCurrent: number;

        private money: number;
        private score: number;
        private health: number;

        public NextLevelEvent: any;

        constructor(scoreGoal: number, health: number) {
            this.level = 1;
            this.scoreGoal = scoreGoal;
            this.scoreCurrent = 0;

            this.money = 0;
            this.score = 0;
            this.health = health;
        }

        //start getters
        public get Level() {
            return this.level;
        }

        public get Money() {
            return this.money;
        }

        public get Score() {
            return this.score;
        }

        public get Health() {
            return this.health;
        }
        //end getters

        public Hit(amount: number) {
            this.health -= amount;
        }

        public AddScore(amount: number) {
            this.score += amount;
        }
        public SubScore(amount: number) {
            this.score -= amount;
        }

        public Update(timeDelta: number) {
            if (this.scoreCurrent >= this.scoreGoal) {
                this.scoreGoal = this.scoreGoal * 3;
                this.level++;

                if (this.NextLevelEvent) {
                    this.NextLevelEvent();
                }
            }
        }

        public Draw(additionalDraw?: any) {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, 60), origin: new Vector2(1, 1), color: new Color4(0, 0, 0, 0.1) });

            Setups.I.Draw.TextFill(<TextParams>{ str: "Level: " + this.level, position: new Vector2(Setups.I.Center.X, 5), color: Color4.Gray(), fontName: "serif", fontSize: 30, origin: new Vector2(0, -1) });
            Setups.I.Draw.TextFill(<TextParams>{ str: "Score: " + this.score, position: new Vector2(Setups.I.Center.X, 35), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(0, -1) });
            Setups.I.Draw.TextFill(<TextParams>{ str: this.money + " :Money", position: new Vector2(Setups.I.WindowWidth - 10, 7), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });
            Setups.I.Draw.TextFill(<TextParams>{ str: this.health + " :Health", position: new Vector2(Setups.I.WindowWidth - 10, 33), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });

            if (additionalDraw) {
                additionalDraw();
            }
        }
    }
}