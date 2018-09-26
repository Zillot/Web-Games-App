/// <reference path="../../../../core/abstracts/WGAGame.ts"/>

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
            this.zombies = [];
            this.guns = [];

            this.killed = 0;
            this.maxZombies = 4;
            this.zombieSpawnPause = 0;

            this.game = new Game(20, 100);
            this.game.NextLevelEvent = () => {
                this.maxZombies += (2 * this.game.Level);
            };

            this.guns.push(new Gun(new Vector2(Setups.I.WindowWidth - 50, Setups.I.WindowHeight / 2), 0.5));

            super.Init();
        }

        //============ UPDATE ============
        public Update(timeDelta: number): void {
            super.Update(timeDelta);

            this.UpdateSpawnLogic(timeDelta);

            this.UpdateZombies(timeDelta);
            this.UpdateGuns(timeDelta);

            this.game.Update(timeDelta);
        }

        public UpdateSpawnLogic(timeDelta: number): void {
            if (this.zombies.length < this.maxZombies && this.zombieSpawnPause <= 0) {
                this.SpawnZombie();
                this.zombieSpawnPause = 4 / this.game.Level;
            }

            if (this.zombieSpawnPause > 0) {
                this.zombieSpawnPause -= timeDelta;
            }
        }

        public SpawnZombie(): void {
            var pos = new Vector2(-40, Setups.I.Utils.RandI(100, Setups.I.WindowHeight - 100));
            var hp = 50 * this.game.Level;
            var speed = 50 * (this.game.Level / 2);

            this.zombies.push(new Zombie(pos, hp, speed));
        }

        public UpdateGuns(timeDelta: number): void {
            for (var gunKey in this.guns) {
                var gun = this.guns[gunKey];

                gun.Update(timeDelta, this.TryToHitEveryZombieWithBullet);
            }
        }

        public TryToHitEveryZombieWithBullet(bullet: Bullet): void {
            for (var zombieKey in this.zombies) {
                var zombie = this.zombies[zombieKey];

                if (zombie.TryHit(bullet)) {
                    bullet.MarkToBeRemoved();
                }

                if (zombie.Hp <= 0) {
                    this.killed++;
                    this.game.AddScore(10);
                    zombie.MarkToBeRemoved();
                }
            }
        }

        public UpdateZombies(timeDelta: number): void {
            for (var zombieKey in this.zombies) {
                var zombie = this.zombies[zombieKey];

                zombie.Update(timeDelta);

                if (zombie.NotOnTheGameField()) {
                    zombie.MarkToBeRemoved();
                    this.game.SubScore(5);
                    this.HitPlayer(zombie.Power);
                }

                this.RemoveDeadZombie(zombie);
            }
        }

        public RemoveDeadZombie(zombie: Zombie): void {
            if (zombie.ShouldBeRemoved()) {
                var index = this.zombies.indexOf(zombie);
                this.zombies.splice(index, 1);
            }
        }

        public HitPlayer(power: number): void {
            this.game.Hit(power);

            if (this.game.IsPlayerDead()) {
                this.ShowModal(ZombieShooterUI.GameOverModal);
            }
        }

        //============ DRAW ============
        public Draw(): void {
            this.DrawZombies();
            this.DrawGuns();

            this.game.Draw(this.DrawGameMenu);
            super.Draw();
        }

        public DrawGameMenu() {
            Setups.I.Draw.TextFill(<TextParams>{ str: "Killed: " + this.killed, position: new Vector2(10, 29), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(-1, 0) });
        }

        public DrawZombies(): void {
            for (var zombiesKey in this.zombies) {
                this.zombies[zombiesKey].Draw();
            }
        }

        public DrawGuns(): void {
            for (var gundsKey in this.guns) {
                this.guns[gundsKey].Draw();
            }
        }
    }
}