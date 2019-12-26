import { TextParams } from "../../../../core/models/TextParams";
import { Data } from "../../../../app/Data";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { Bullet } from "../../../common/Bullet";
import { Gun } from "../../../common/Gun";
import { ZombieShooterUI } from "./ZombieShooter.ui";
import { Game } from "../../../../core/services/Game";
import { CityWall } from "./CityWall";
import { GamePage } from "../../../../core/abstracts/GamePage";
import { Draw } from 'src/ts/core/services/Draw';
import { ZombieService } from './zombies/ZombieService';

export class ZombieShooter extends GamePage {
    private guns: Gun[];

    private game: Game;
    private cityWall: CityWall;

    private zombieService: ZombieService;

    private killed: number;

    constructor() {
        super();
    }

    public Init(): void {
        ZombieShooterUI.CreateGameOverModal(() => this.RestartGame());
        ZombieShooterUI.SetupUI(this.UiComponents);
        ZombieShooterUI.BuyNextLevelBtn.SetOnClick(() => {
            this.game.BuyNextLevel();
            this.NextLevelBecomeAvailableChangedEvent(this.game.NextLevelAvailable);
        });

        this.game = new Game();
        this.zombieService = new ZombieService(this.game);
        this.game.NextLevelEvent = () => { this.zombieService.NextLevelHandler(); };
        this.game.NextLevelBecomeAvailableChangedEvent = (state) => { this.NextLevelBecomeAvailableChangedEvent(state); };
        this.game.GameOverEvent = () => { this.GameOverHandler(); };

        this.RestartGame();
        super.Init();
    }

    public RestartGame(): void {
        this.guns = [];
        this.killed = 0;
        this.cityWall = new CityWall(new Vector2(Data.I.WindowSize.X - 20, Data.I.WindowSize.Y / 2), 1);
        this.guns.push(new Gun(new Vector2(Data.I.WindowSize.X - 50, Data.I.WindowSize.Y / 2), 0.5));

        this.game.RestartGame(20, 100);

        this.NextLevelBecomeAvailableChangedEvent(this.game.NextLevelAvailable);

        super.HideAllModals(false);
    }

    public NextLevelBecomeAvailableChangedEvent(state: boolean) {
        var pos = ZombieShooterUI.BuyNextLevelBtn.Position;
        if (state) {
            ZombieShooterUI.BuyNextLevelBtn.MoveTo(new Vector2(pos.X, 40), 300);
        }
        else {
            ZombieShooterUI.BuyNextLevelBtn.MoveTo(new Vector2(pos.X, -50), 300);
        }
    }

    public GameOverHandler() {
        super.ShowModal(ZombieShooterUI.GameOverModal);

        for (var gunKey in this.guns) {
            var gun = this.guns[gunKey];
            gun.Hit(gun.Health);
        }
    }

    //============ UPDATE ============
    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        this.game.Update(timeDelta);
        this.cityWall.Update(timeDelta);

        this.UpdateGuns(timeDelta);
        this.zombieService.Update(timeDelta);
    }

    public UpdateGuns(timeDelta: number): void {
        for (var gunKey in this.guns) {
            var gun = this.guns[gunKey];

            gun.Update(timeDelta, (bullet) => { this.TryToHitEveryZombieWithBullet(bullet); });
        }
    }

    public TryToHitEveryZombieWithBullet(bullet: Bullet): void {
        for (var zombieKey in this.zombieService.Zombies) {
            var zombie = this.zombieService.Zombies[zombieKey];

            if (zombie.TryHit(bullet)) {
                bullet.MarkToBeRemoved();
            }

            if (zombie.Hp <= 0 && !zombie.ShouldBeRemoved()) {
                this.killed++;
                this.game.AddScore(10);
                zombie.MarkToBeRemoved();
            }
        }
    }

    //============ DRAW ============
    public Draw(): void {
        this.cityWall.Draw();

        this.zombieService.Draw();
        this.DrawGuns();

        this.game.Draw(() => {
            this.DrawGameMenu();
        });
        super.Draw();
    }

    public DrawGameMenu() {
        Draw.I.TextFill(<TextParams>{ str: "Killed: " + this.killed, position: new Vector2(10, 29), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(-1, 0) });
    }

    public DrawGuns(): void {
        for (var gundsKey in this.guns) {
            this.guns[gundsKey].Draw();
        }
    }
}