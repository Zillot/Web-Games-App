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
            this.coreSafeRadius = 50;

            this.game = new Game(20, 100);
            this.game.NextLevelEvent = () => {
                this.maxEnemies += (2 * this.game.Level);
            };

            this.guns.push(new CoreGun(5));
        }

        public Update(timeDelta: number): void {
            this.UpdateSpawnLogic(timeDelta);

            this.UpdateGuns(timeDelta);
            this.UpdateEnemies(timeDelta);

            this.game.Update(timeDelta);
            super.Update(timeDelta);
        }

        public UpdateSpawnLogic(timeDelta: number): void {
            if (this.enemies.length < this.maxEnemies && this.enemieSpawnPause <= 0) {
                this.SpawnEnemy();
                this.enemieSpawnPause = 2 / this.game.Level;
            }

            if (this.enemieSpawnPause > 0) {
                this.enemieSpawnPause -= timeDelta;
            }
        }

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

        public UpdateGuns(timeDelta: number) {
            for (var gunsKey in this.guns) {
                var gun = this.guns[gunsKey];

                gun.Update(timeDelta);
            }
        }

        public UpdateEnemies(timeDelta: number) {
            for (var enemyKey in this.enemies) {
                var enemy = this.enemies[enemyKey];

                enemy.Update(timeDelta);

                this.CheckEnemyDistance(enemy);

                if (enemy.ShouldBeRemoved()) {
                    var index = this.enemies.indexOf(enemy);
                    this.enemies.splice(index, 1);
                }
            }
        }

        public CheckEnemyDistance(enemy: Enemy) {
            var isCloseEnought = Vector2.Distance(enemy.Position, Setups.I.Center) < this.coreSafeRadius + enemy.Radius;
            var isNotTooClose = Vector2.Distance(enemy.Position, Setups.I.Center) > this.coreSafeRadius - enemy.Radius * 2;
            if (isCloseEnought && !isNotTooClose) {
                var enemyAngle = Vector2.Left().AngleTo(enemy.Position.SUB(Setups.I.Center));
                var rightGunAngle = this.guns.filter(x => x.CoveredByShield(enemyAngle))[0];

                if (rightGunAngle) {
                    this.game.AddScore(10);
                    enemy.MarkToBeRemoved();
                    return;
                }
            }

            var isOnProperDemageClose = Vector2.Distance(enemy.Position, Setups.I.Center) < this.coreSafeRadius * 0.75;
            if (isOnProperDemageClose) {
                this.game.SubScore(5);

                enemy.MarkToBeRemoved();
                this.HitPlayer(enemy.Power);
            }
        }

        public HitPlayer(power: number): void {
            this.game.Hit(power);
        }

        public Draw(): void {
            this.DrawCore();

            this.DrawEnemy();
            this.DrawGuns();

            this.game.Draw();
            super.Draw();
        }

        public DrawCore() {
            //core area
            Setups.I.Draw.CircleStroke(<StrokeCircleParams>{ position: Setups.I.Center, radius: this.coreSafeRadius, color: Color4.Gray().GetTransparent(0.1) });

            //gloving area or shiled,
            var color1 = Color4.ColorFromHex('#7777FF');
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: Setups.I.Center, radius: 30, color: color1.GetTransparent(0.2) });
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: Setups.I.Center, radius: 10, color: color1.GetTransparent(0.5) });
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: Setups.I.Center, radius: 6, color: color1.GetTransparent(0.5) });

        }

        public DrawEnemy(): void {
            for (var enemyKey in this.enemies) {
                this.enemies[enemyKey].Draw();
            }
        }

        public DrawGuns(): void {
            for (var gunsKey in this.guns) {
                this.guns[gunsKey].Draw();
            }
        }
    }
}