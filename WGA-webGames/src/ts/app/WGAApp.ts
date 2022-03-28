import { IUpdateable } from "../core/interfaces/IUpdateable";
import { IDrawable } from "../core/interfaces/IDrawable";
import { WGAGameContainer } from "../WGA/WGAGameContainer";
import { MainPage } from "../WGA/views/pages/MainPage";
import { CameraTest } from "../WGA/views/pages/CameraTest";
import { CollisionTest } from "../WGA/views/pages/CollisionTest";
import { ZombieShooter } from "../WGA/views/games/zombieShoter/ZombieShooter";
import { CoreDefence } from "../WGA/views/games/coreDefence/CoreDefence";
import { CastleDefence } from "../WGA/views/games/castleDefence/CastleDefence";
import { YotaOnline } from "../WGA/views/games/yotaOnline/YotaOnline";
import { Pages } from '../core/services/Pages';
import { Data } from './Data';
import { Draw } from '../core/services/Draw';

export class WGAApp implements IUpdateable, IDrawable {
    public constructor(
        private _draw: Draw,
        private _pages: Pages) {
    }

    private pause: boolean;
    private currentGame: WGAGameContainer;
    
    public Initialize(): void {
        this.pause = true;

        this._pages.Reset();

        this._pages.CreatePage("Main", new MainPage(this._draw));
        this._pages.CreatePage("CameraTest", new CameraTest(this._draw));
        this._pages.CreatePage("CollisionTest", new CollisionTest(this._draw));

        this._pages.CreatePage("YotaOnline", new YotaOnline(this._draw));
        this._pages.CreatePage("ZombieShooter", new ZombieShooter(this._draw));
        this._pages.CreatePage("CoreDefence", new CoreDefence(this._draw));
        this._pages.CreatePage("CastleDeffence", new CastleDefence(this._draw));

        this._pages.InstantNavigateTo("YotaOnline");
    }

    public Update(timeDelta: number): void {
        if (this.pause == true) {
            this._pages.Update(timeDelta);
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.Update(timeDelta);
        }
    }

    public Draw(): void {
        if (this.pause == true) {
            Data.I.Camera.AdjustMenuViewToCamera();
            this._pages.Draw(this._draw);
            Data.I.Camera.RemoveCameraInfuence();
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.DrawGame();
        }
    }
}
