/// <reference path="../../app/models/abstracts/WGAGame.ts"/>

module WGAAppModule {
    'use strict';

    export class CoreDefence extends WGAGame {
        private enemies: Enemy[];
        private guns: CoreGun[];

        private maxEnemies: number;
        private enemieSpawnPause: number;
        private coreSafeRadius: number;

        private game: Game;

        constructor() {
            super();
        }

        public Init(): void {
            this.enemies = [];
            this.guns = [];

            this.maxEnemies = 10;
            this.enemieSpawnPause = 1;

            this.game = new Game(20, 100);

            this.game.NextLevelEvent = () => {
                this.maxEnemies += (2 * this.game.Level);
            };

            this.coreSafeRadius = 50;

            this.guns.push(new CoreGun(5));
        }

        public Update(timeDelta: number): void {
            if (Setups.I.Input.GetMouseState() == MouseState.down) {
                for (var item in this.guns) {
                    this.guns[item].Shoot(Setups.I.Input.GetMousePosition());
                }
            }

            if (this.enemies.length < this.maxEnemies && this.enemieSpawnPause <= 0) {
                this.SpawnEnemy();
                this.enemieSpawnPause = 2 / this.game.Level;
            }

            if (this.enemieSpawnPause > 0) {
                this.enemieSpawnPause -= timeDelta;
            }

            for (var item in this.enemies) {
                this.enemies[item].Update(timeDelta);
            }
            for (var item in this.guns) {
                this.guns[item].Update(timeDelta);
            }

            for (var enemyKey = 0; enemyKey < this.enemies.length; enemyKey++) {
                var enemy = this.enemies[enemyKey];

                var closeEnought = Vector2.Distance(enemy.Position, Setups.I.Center) < this.coreSafeRadius + enemy.Radius;
                var notToClose = Vector2.Distance(enemy.Position, Setups.I.Center) > this.coreSafeRadius - enemy.Radius * 2;

                if (closeEnought && !notToClose) {
                    var enemyAngle = Vector2.Left().AngleTo(enemy.Position.SUB(Setups.I.Center));
                    var rightGunAngle = this.guns.filter(x => x.CoveredByShield(enemyAngle))[0];

                    if (rightGunAngle) {
                        this.game.AddScore(10);
                        this.enemies.splice(enemyKey--, 1);
                        continue
                    }
                }

                var demageClose = Vector2.Distance(enemy.Position, Setups.I.Center) < this.coreSafeRadius * 0.75;

                if (demageClose) {
                    this.game.SubScore(5);

                    this.enemies.splice(enemyKey--, 1);
                    this.HitPlayer(enemy.Power);
                }
            }

            this.game.Update(timeDelta);
            super.Update(timeDelta);
        }
        public Draw(): void {
            Setups.I.Draw.CircleStroke(<StrokeCircleParams>{ position: Setups.I.Center, radius: this.coreSafeRadius, color: Color4.Gray().GetTransparent(0.1) });

            for (var item in this.enemies) {
                this.enemies[item].Draw();
            }
            for (var item in this.guns) {
                this.guns[item].Draw();
            }

            this.game.Draw();
            super.Draw();
        }
        //-------------
        public SpawnEnemy(): void {
            var x = Setups.I.Utils.RandI(-100, Setups.I.WindowWidth + 100);
            var y = 0;

            if (x < 0 || x > Setups.I.WindowWidth) {
                y = Setups.I.Utils.RandI(-100, Setups.I.WindowHeight + 100);
            }
            else {
                if (Setups.I.Utils.RandI(0, 1) >= 1) {
                    y = Setups.I.Utils.RandI(-100, -10);
                }
                else {
                    y = Setups.I.Utils.RandI(Setups.I.WindowHeight + 10, Setups.I.WindowHeight + 100);
                }
            }

            var pos = new Vector2(x, y);
            var hp = 50 * this.game.Level;
            var speed = 200 * (this.game.Level / 2);

            this.enemies.push(new Enemy(pos, hp, speed));
        }
        public HitPlayer(power: number): void {
            this.game.Hit(power);
        }
    }
}