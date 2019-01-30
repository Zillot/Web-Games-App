/// <reference path="../../../../core/abstracts/WGAGame.ts"/>

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

            CoreDefenceUI.SetupUI(this.UiComponents);

            CastleDefenceUI.BuildTower.SetOnClick(function () {
                this.GoToBuildMode();
            });
        }

        public GoToBuildMode(): void {
            this.towerToBuild = new Tower(this.GetTowerToBuildPosition(), 100, new Vector2(50, 80), 0);
        }

        public Init(): void {
            this.game = new Game(20, 100);
            this.castle = new Castle(new Vector2(Setups.I.WindowWidth / 2, Setups.I.WindowHeight), 100);

            this.game.NextLevelEvent = () => { };

            this.towers = [];

            super.Init();
        }

        //============ UPDATE ============
        public Update(timeDelta: number): void {
            this.game.Update(timeDelta);
            this.castle.Update(timeDelta);

            if (this.towerToBuild) {
                this.TowerBildingUpdate();
            }
        }

        public TowerBildingUpdate() {
            this.towerToBuild.Position = this.GetTowerToBuildPosition();

            var allowToBuild = this.IsAllowToBuild(this.towerToBuild);
            if (allowToBuild) {
                this.SetBuildColors(Color4.Green, Color4.DarkGreen);
            }
            else {
                this.SetBuildColors(Color4.Red, Color4.DarkRed);
            }

            this.BuildTowerIfMousePressed(allowToBuild)
        }

        public GetTowerToBuildPosition(): Vector2 {
            var mouse = Setups.I.Input.GetMousePosition();
            mouse.X = Math.round(mouse.X / 5) * 5;
            mouse.Y = 0;

            return mouse;
        }

        public IsAllowToBuild(tower: Tower): boolean {
            var farEnoughtFromCastle = Vector2.Distance(tower.Position, this.castle.Position) < this.towerDistanceMinimum;
            var farEnoughtFromTowers = this.towers.filter(x => {
                return Vector2.Distance(tower.Position, x.Position) < this.towerDistanceMinimum
            }).length == 0;

            return farEnoughtFromTowers && farEnoughtFromCastle
        }

        public SetBuildColors(color1: Color4, color2: Color4) {
            this.towerToBuild.Color1 = color1.GetTransparent(0.3);
            this.towerToBuild.Color2 = color2.GetTransparent(0.3);
        }

        public BuildTowerIfMousePressed(allowToBuild: boolean) {
            if (Setups.I.Input.GetMouseState() == MouseState.Down && allowToBuild) {
                this.BuildTower(this.towerToBuild);
                this.towerToBuild = null;
            }
        }

        public BuildTower(tower: Tower): void {
            this.towers.push(new Tower(tower.Position, 100, new Vector2(50, 80), 0));
        }

        public HitPlayer(power: number): void {
            this.game.Hit(power);
        }

        //============ DRAW ============
        public Draw(): void {
            this.game.Draw();
            this.castle.Draw();
        }
    }
}