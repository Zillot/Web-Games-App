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
import { Draw } from '../core/services/Draw';

export class WGAApp implements IUpdateable, IDrawable {
    public static I: WGAApp;
    public static _initialize = (() => {
        WGAApp.I = new WGAApp();
    })();

    private pause: boolean;
    private currentGame: WGAGameContainer;
    
    public Initialize(): void {
        this.pause = true;

        Pages.I.Reset();

        Pages.I.CreatePage("Main", new MainPage());
        Pages.I.CreatePage("CameraTest", new CameraTest());
        Pages.I.CreatePage("CollisionTest", new CollisionTest());

        Pages.I.CreatePage("YotaOnline", new YotaOnline());
        Pages.I.CreatePage("ZombieShooter", new ZombieShooter());
        Pages.I.CreatePage("CoreDefence", new CoreDefence());
        Pages.I.CreatePage("CastleDeffence", new CastleDefence());

        Pages.I.InstantNavigateTo("YotaOnline");
    }

    public Update(timeDelta: number): void {
        if (this.pause == true) {
            Pages.I.Update(timeDelta);
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.Update(timeDelta);
        }
    }

    public Draw(): void {
        if (this.pause == true) {
            Draw.I.adjustMenuViewToCamera();
            Pages.I.Draw();
            Draw.I.removeCameraInfuence();
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.DrawGame();
        }
    }
}
