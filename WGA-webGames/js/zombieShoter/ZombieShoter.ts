module WGAAppModelue {
    'use strict';

    export class ZombieShoter implements IWGAGame {
        private zombies: Zombie[];
        private guns: Gun[];

        private maxZombies: number;
        private zombieSpawnPause: number;
        private coreSafeRadius: number;

        private scoreGoal: number;
        private scoreCurrent: number;
        private level: number;

        private killed: number;
        private money: number;
        private score: number;
        private health: number;

        public Init(): void {
            this.killed = 0;
            this.score = 0;
            this.money = 0;
            this.health = 100;

            this.zombies = [];
            this.guns = [];

            this.level = 1;
            this.maxZombies = 4;
            this.scoreGoal = 20;
            this.scoreCurrent = 0;
            this.zombieSpawnPause = 0;

            this.guns.push(new Gun(new Vector2(Setups.I.WindowWidth - 50, Setups.I.WindowHeight / 2), 0.5));
        }

        public Update(timeDelta: number): void {
            if (Setups.I.Input.GetMouseState() == MouseState.down) {
                for (var item in this.guns) {
                    this.guns[item].Shoot(Setups.I.Input.MousePos);
                }
            }

            if (this.zombies.length < this.maxZombies && this.zombieSpawnPause <= 0) {
                this.SpawnZombie();
                this.zombieSpawnPause = 4 / this.level;
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
                            this.score += 10;

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
                    this.score -= 5;

                    this.zombies.splice(zombieKey--, 1);
                    this.HitPlayer(zombie.Power);
                }
            }

            if (this.scoreCurrent >= this.scoreGoal) {
                this.scoreGoal = this.scoreGoal * 3;
                this.maxZombies += (2 * this.level);
                this.level++;
            }
        }
        public Draw(ctx: any): void {
            for (var item in this.zombies) {
                this.zombies[item].Draw(ctx);
            }
            for (var item in this.guns) {
                this.guns[item].Draw(ctx);
            }

            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, 60), origin: new Vector2(1, 1), color: new Color4(0, 0, 0, 0.1) });

            Setups.I.Draw.TextFill(<TextParams>{ str: "Killed: " + this.killed, position: new Vector2(10, 29), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(-1, 0) });
            Setups.I.Draw.TextFill(<TextParams>{ str: "Level: " + this.level, position: new Vector2(Setups.I.WindowWidth / 2, 5), color: Color4.Gray(), fontName: "serif", fontSize: 30, origin: new Vector2(0, -1) });
            Setups.I.Draw.TextFill(<TextParams>{ str: "Score: " + this.score, position: new Vector2(Setups.I.WindowWidth / 2, 35), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(0, -1) });
            Setups.I.Draw.TextFill(<TextParams>{ str: this.money + " :Money", position: new Vector2(Setups.I.WindowWidth - 10, 7), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });
            Setups.I.Draw.TextFill(<TextParams>{ str: this.health + " :Health", position: new Vector2(Setups.I.WindowWidth - 10, 33), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });
        }
        //-------------
        public SpawnZombie(): void {
            var pos = new Vector2(-40, Setups.I.Utils.RandI(100, Setups.I.WindowHeight - 50));
            var hp = 50 * this.level;
            var speed = 50 * (this.level / 2);

            this.zombies.push(new Zombie(pos, hp, speed));
        }
        public HitPlayer(power: number): void {
            this.health -= power;
        }
    }
}