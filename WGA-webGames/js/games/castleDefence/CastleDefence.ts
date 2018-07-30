/// <reference path="../../app/models/abstracts/WGAGame.ts"/>

module WGAAppModule {
    'use strict';

    export class CastleDefence extends WGAGame {
        private towerDistanceMinimum = 200;

        private game: Game;
        private castle: Castle;

        private towers: Tower[];

        private towerToBuild: Tower;

        constructor() {
            super();

            this.Buttons.push(Button.GetButton({
                name: "BuildTower",
                text: "B",
                onClick: function () {
                    this.GoToBuildMode()
                },
                position: new Vector2(20, 20),
                size: new Vector2(40, 40),
                color: Color4.White()
            }));
        }

        public Init(): void {
            this.game = new Game(20, 100);
            this.castle = new Castle(new Vector2(Setups.I.WindowWidth / 2, Setups.I.WindowHeight), 100);

            this.game.NextLevelEvent = () => { };

            this.towers = [];
        }
        public Update(timeDelta: number): void {
            this.game.Update(timeDelta);
            this.castle.Update(timeDelta);

            if (this.towerToBuild) {
                this.towerToBuild.Position = this.GetTowerToBuildPosition();

                var allowToBuild = this.IsAllowToBuild(this.towerToBuild);
                if (allowToBuild) {
                    this.towerToBuild.Color1 = Color4.Green().GetTransparent(0.3);
                    this.towerToBuild.Color2 = Color4.DarkGreen().GetTransparent(0.3);
                }
                else {
                    this.towerToBuild.Color1 = Color4.Red().GetTransparent(0.3);
                    this.towerToBuild.Color2 = Color4.DarkRed().GetTransparent(0.3);
                }

                if (Setups.I.Input.GetMouseState() == MouseState.down && allowToBuild) {
                    this.BuildTower(this.towerToBuild);
                    this.towerToBuild = null;
                }
            }
        }
        public Draw(): void {
            this.game.Draw();
            this.castle.Draw();
        }
        //-------------
        public GoToBuildMode(): void {
            this.towerToBuild = new Tower(this.GetTowerToBuildPosition(), 100, new Vector2(50, 80), 0);
        }
        public GetTowerToBuildPosition(): Vector2 {
            var mouse = Setups.I.Input.GetMousePosition();
            mouse.X = Math.round(mouse.X / 5) * 5;
            mouse.Y = 0;

            return mouse;
        }
        public IsAllowToBuild(tower: Tower): boolean {
            var farEnoughtFromTowers = this.towers.filter(x => {
                return Vector2.Distance(tower.Position, x.Position) < this.towerDistanceMinimum
            }).length == 0;

            var farEnoughtFromCastle = Vector2.Distance(tower.Position, this.castle.Position) < this.towerDistanceMinimum;

            return farEnoughtFromTowers && farEnoughtFromCastle
        }
        public BuildTower(tower: Tower): void {
            this.towers.push(new Tower(tower.Position, 100, new Vector2(50, 80), 0));
        }
        public HitPlayer(power: number): void {
            this.game.Hit(power);
        }
    }
}