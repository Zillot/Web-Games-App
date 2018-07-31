/// <reference path="../../app/models/abstracts/WGAGame.ts"/>

module WGAAppModule {
    'use strict';

    export class ZombieShooter extends WGAGame {
        private zombies: Zombie[];
        private guns: Gun[];

        private maxZombies: number;
        private zombieSpawnPause: number;
        private coreSafeRadius: number;

        private game: Game;

        private killed: number;

        constructor() {
            super();
        }

        public Init(): void {
            this.killed = 0;

            this.zombies = [];
            this.guns = [];

            this.maxZombies = 4;
            this.zombieSpawnPause = 0;

            this.game = new Game(20, 100);

            this.game.NextLevelEvent = () => {
                this.maxZombies += (2 * this.game.Level);
            };

            this.guns.push(new Gun(new Vector2(Setups.I.WindowWidth - 50, Setups.I.WindowHeight / 2), 0.5));
        }

        public Update(timeDelta: number): void {
            if (Setups.I.Input.GetMouseState() == MouseState.down) {
                for (var item in this.guns) {
                    this.guns[item].Shoot(Setups.I.Input.GetMousePosition());
                }
            }

            if (this.zombies.length < this.maxZombies && this.zombieSpawnPause <= 0) {
                this.SpawnZombie();
                this.zombieSpawnPause = 4 / this.game.Level;
            }

            if (this.zombieSpawnPause > 0) {
                this.zombieSpawnPause -= timeDelta;
            }

            for (var item in this.zombies) {
                this.zombies[item].Update(timeDelta);
            }
            for (var item in this.guns) {
                this.guns[item].Update(timeDelta);
            }

            for (var gunKey in this.guns) {
                var gun = this.guns[gunKey];
                for (var bulletKey = 0; bulletKey < gun.Bullets.length; bulletKey++) {
                    var bullet = gun.Bullets[bulletKey];

                    if (bullet.Position.X < -100) {
                        gun.Bullets.splice(bulletKey--, 1);
                        continue;
                    }

                    for (var zombieKey = 0; zombieKey < this.zombies.length; zombieKey++) {
                        var zombie = this.zombies[zombieKey];

                        if (zombie.TryHit(bullet)) {
                            gun.Bullets.splice(bulletKey--, 1);
                        }

                        if (zombie.Hp <= 0 || zombie.Position.X > Setups.I.WindowWidth + 100) {
                            this.game.AddScore(10);

                            if (zombie.Hp <= 0) {
                                this.killed++;
                            }

                            this.zombies.splice(zombieKey--, 1);
                            if (zombie.Hp > 0) {
                                this.HitPlayer(zombie.Power);
                            }
                        }
                    }
                }
            }

            for (var zombieKey = 0; zombieKey < this.zombies.length; zombieKey++) {
                var zombie = this.zombies[zombieKey];

                if (Vector2.Distance(zombie.Position, Setups.I.Center) < this.coreSafeRadius) {
                    this.game.SubScore(5);

                    this.zombies.splice(zombieKey--, 1);
                    this.HitPlayer(zombie.Power);
                }
            }

            this.game.Update(timeDelta);
        }

        public Draw(): void {
            for (var item in this.zombies) {
                this.zombies[item].Draw();
            }
            for (var item in this.guns) {
                this.guns[item].Draw();
            }

            this.game.Draw(() => {
                Setups.I.Draw.TextFill(<TextParams>{ str: "Killed: " + this.killed, position: new Vector2(10, 29), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(-1, 0) });
            });
        }

        //-------------
        public SpawnZombie(): void {
            var pos = new Vector2(-40, Setups.I.Utils.RandI(100, Setups.I.WindowHeight - 50));
            var hp = 50 * this.game.Level;
            var speed = 50 * (this.game.Level / 2);

            this.zombies.push(new Zombie(pos, hp, speed));
        }

        public HitPlayer(power: number): void {
            this.game.Hit(power);
        }
    }
}