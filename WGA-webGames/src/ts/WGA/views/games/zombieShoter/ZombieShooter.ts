import { TextParams } from "../../../../core/models/TextParams";
import { Data } from "../../../../app/Data";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { Zombie } from "./Zombie";
import { Bullet } from "../../../common/Bullet";
import { Gun } from "../../../common/Gun";
import { ZombieShooterUI } from "./ZombieShooter.ui";
import { Game } from "../../../../core/services/Game";
import { CityWall } from "./CityWall";
import { GamePage } from "../../../../core/abstracts/GamePage";
import { Utils } from 'src/ts/core/services/Utils';
import { Draw } from 'src/ts/core/services/Draw';

export class ZombieShooter extends GamePage {
    private zombies: Zombie[];
    private guns: Gun[];

    private maxZombies: number;
    private zombieSpawnPause: number;
    private coreSafeRadius: number;

    private game: Game;
    private cityWall: CityWall;

    private killed: number;

    private GetZombieHp: any;
    private GetZombieSpeed: any;
    private GetZombiePosition: any;

    constructor() {
        super();
    }

    public Init(): void {
        ZombieShooterUI.CreateGameOverModal(() => this.RestartGame());
        ZombieShooterUI.SetupUI(this.UiComponents);

        this.RestartGame();

        super.Init();
    }

    public RestartGame(): void {
        this.zombies = [];
        this.guns = [];

        this.killed = 0;
        this.maxZombies = 4;
        this.zombieSpawnPause = 0;

        this.cityWall = new CityWall(new Vector2(Data.I.WindowSize.X - 20, Data.I.WindowSize.Y / 2), 1);

        this.game = new Game(20, 100);
        this.game.NextLevelEvent = () => { this.NextLevelHandler(); };
        this.game.GameOverEvent = () => { this.GameOverHandler(); };

        this.guns.push(new Gun(new Vector2(Data.I.WindowSize.X - 50, Data.I.WindowSize.Y / 2), 0.5));

        //value formulas
        this.GetZombieHp = () => { return 500 * this.game.Level; }
        this.GetZombieSpeed = () => { return 50 * (this.game.Level / 2); }
        this.GetZombiePosition = () => { return new Vector2(-40, Utils.RandI(100, Data.I.WindowSize.Y - 100)); }

        super.HideAllModals(false);
    }

    public NextLevelHandler() {
        this.maxZombies += (2 * this.game.Level);
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

        this.UpdateSpawnLogic(timeDelta);

        this.UpdateZombies(timeDelta);
        this.UpdateGuns(timeDelta);
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
        var pos = this.GetZombiePosition();
        var hp = this.GetZombieHp();
        var speed = this.GetZombieSpeed();

        this.zombies.push(new Zombie(pos, hp, speed));
    }

    public UpdateGuns(timeDelta: number): void {
        for (var gunKey in this.guns) {
            var gun = this.guns[gunKey];

            gun.Update(timeDelta, (bullet) => { this.TryToHitEveryZombieWithBullet(bullet); });
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
                this.game.Hit(zombie.Power * 5);
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

    //============ DRAW ============
    public Draw(): void {
        this.cityWall.Draw();

        this.DrawZombies();
        this.DrawGuns();

        this.game.Draw(() => {
            this.DrawGameMenu();
        });
        super.Draw();
    }

    public DrawGameMenu() {
        Draw.I.TextFill(<TextParams>{ str: "Killed: " + this.killed, position: new Vector2(10, 29), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(-1, 0) });
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
