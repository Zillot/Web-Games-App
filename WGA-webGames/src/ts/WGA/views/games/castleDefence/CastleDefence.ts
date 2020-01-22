import { GamePage } from "../../../../core/abstracts/GamePage";
import { Game } from "../../../../core/services/Game";
import { Castle } from "./Castle";
import { Tower } from "./Tower";
import { CastleDefenceUI } from "./CastleDefence.ui";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { Data } from "../../../../app/Data";
import { MouseState } from "../../../../core/models/MouseState";
import { Draw } from 'src/ts/core/services/Draw';
import { MouseInput } from 'src/ts/core/services/MouseInput';

export class CastleDefence extends GamePage {
    private towerDistanceMinimum = 200;

    private game: Game;
    private castle: Castle;

    private towers: Tower[];

    private towerToBuild: Tower;

    constructor(_draw: Draw) {
        super(_draw);
    }

    public Init(): void {
        CastleDefenceUI.CreateGameOverModal(() => this.RestartGame());
        CastleDefenceUI.SetupUI(this.UiComponents);

        CastleDefenceUI.BuildTower.SetOnClick(function () {
            this.GoToBuildMode();
        });
        this.game = new Game(this._draw);
        this.game.NextLevelEvent = this.NextLevelHandler;
        this.game.GameOverEvent = this.GameOverHandler;

        super.Init();
    }

    public RestartGame(): void {
        this.castle = new Castle(new Vector2(Data.I.WindowSize.X / 2, Data.I.WindowSize.Y), 100);

        this.game.RestartGame(20, 100);

        this.towers = [];

        super.HideAllModals(false);
    }

    public NextLevelHandler() {

    }

    public GameOverHandler() {
        super.ShowModal(CastleDefenceUI.GameOverModal);
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
        var mouse = MouseInput.GetMousePosition();
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
        if (MouseInput.GetMouseState() == MouseState.Down && allowToBuild) {
            this.BuildTower(this.towerToBuild);
            this.towerToBuild = null;
        }
    }

    public BuildTower(tower: Tower): void {
        this.towers.push(new Tower(tower.Position, 100, new Vector2(50, 80), 0));
    }

    public GoToBuildMode(): void {
        this.towerToBuild = new Tower(this.GetTowerToBuildPosition(), 100, new Vector2(50, 80), 0);
    }

    //============ DRAW ============
    public Draw(): void {
        this.game.Draw();
        this.castle.Draw(this._draw);
    }
}
