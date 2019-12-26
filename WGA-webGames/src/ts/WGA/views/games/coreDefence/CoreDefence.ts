import { Data } from "../../../../app/Data";
import { StrokeCircleParams } from "../../../../core/models/StrokeCircleParams";
import { Color4 } from "../../../../core/engine/Color4";
import { FillCircleParams } from "../../../../core/models/FillCircleParams";
import { GamePage } from "../../../../core/abstracts/GamePage";
import { Enemy } from "./Enemy";
import { CoreGun } from "./CoreGun";
import { Game } from "../../../../core/services/Game";
import { CoreDefenceUI } from "./CoreDefence.ui";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Utils } from 'src/ts/core/services/Utils';
import { Draw } from 'src/ts/core/services/Draw';

export class CoreDefence extends GamePage {
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
        CoreDefenceUI.CreateGameOverModal(() => this.RestartGame());
        CoreDefenceUI.SetupUI(this.UiComponents);

        this.game = new Game();
        this.game.NextLevelEvent = this.NextLevelHandler;
        this.game.GameOverEvent = this.GameOverHandler;

        this.RestartGame();
        super.Init();
    }

    public RestartGame(): void {
        this.enemies = [];
        this.guns = [];

        this.maxEnemies = 10;
        this.enemieSpawnPause = 1;
        this.coreSafeRadius = 50;

        this.game.RestartGame(20, 100);

        this.guns.push(new CoreGun(5));

        super.HideAllModals(false);
    }

    public NextLevelHandler() {
        this.maxEnemies += (2 * this.game.Level);
    }

    public GameOverHandler() {
        super.ShowModal(CoreDefenceUI.GameOverModal);

        for (var gunKey in this.guns) {
            var gun = this.guns[gunKey];
            gun.Hit(gun.Health);
        }
    }

    //============ UPDATE ============
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
        var pos = Utils.RandVector().MUL(Data.I.WindowSize.X + 150);
        var hp = 50 * this.game.Level;
        var speed = 200 * (this.game.Level / 2);

        this.enemies.push(new Enemy(pos, hp, speed));
    }

    public UpdateGuns(timeDelta: number) {
        for (var gunsKey in this.guns) {
            var gun = this.guns[gunsKey];

            gun.Update(timeDelta, null);
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
        var fromEnemyToCenter = Vector2.Distance(enemy.Position, Data.I.Center);

        this.tryToDefendWithGun(fromEnemyToCenter, enemy);

        if (!enemy.ShouldBeRemoved()) {
            this.tryToHitCore(fromEnemyToCenter, enemy);
        }
    }

    public tryToDefendWithGun(fromEnemyToCenter: number, enemy: Enemy) {
        var isCloseEnought = fromEnemyToCenter < this.coreSafeRadius + enemy.Radius;
        var isNotTooClose = fromEnemyToCenter < this.coreSafeRadius - enemy.Radius * 2;

        if (isCloseEnought && isNotTooClose) {
            var enemyAngle = enemy.Direction.MUL(-1).AngleAbsTo(Vector2.Left);
            var rightGunAngle = this.guns.filter(x => x.CoveredByShield(enemyAngle))[0];

            if (rightGunAngle) {
                this.game.AddScore(10);
                enemy.MarkToBeRemoved();
            }
        }
    }

    public tryToHitCore(fromEnemyToCenter: number, enemy: Enemy) {
        var isOnProperDemageClose = fromEnemyToCenter < this.coreSafeRadius * 0.75;
        if (isOnProperDemageClose) {
            this.game.SubScore(5);

            enemy.MarkToBeRemoved();
            this.game.Hit(enemy.Power);
        }
    }

    //============ DRAW ============
    public Draw(): void {
        this.DrawCore();

        this.DrawEnemy();
        this.DrawGuns();

        this.game.Draw();
        super.Draw();
    }

    public DrawCore() {
        //core area
        Draw.I.CircleStroke(<StrokeCircleParams>{ position: Data.I.Center, radius: this.coreSafeRadius, color: Color4.Gray.GetTransparent(0.1) });

        //gloving area or shield
        var color1 = Color4.ColorFromHex('#7777FF');
        Draw.I.CircleFill(<FillCircleParams>{ position: Data.I.Center, radius: 30, color: color1.GetTransparent(0.2) });
        Draw.I.CircleFill(<FillCircleParams>{ position: Data.I.Center, radius: 10, color: color1.GetTransparent(0.5) });
        Draw.I.CircleFill(<FillCircleParams>{ position: Data.I.Center, radius: 6, color: color1.GetTransparent(0.5) });
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
