import { IUpdateable } from "../core/interfaces/IUpdateable";
import { Data } from "./Setups";
import { IDrawable } from "../core/interfaces/IDrawable";
import { WGAGameContainer } from "../WGA/WGAGameContainer";
import { MainPage } from "../WGA/views/pages/MainPage";
import { CameraTest } from "../WGA/views/pages/CameraTest";
import { CollisionTest } from "../WGA/views/pages/CollisionTest";
import { ZombieShooter } from "../WGA/views/games/zombieShoter/ZombieShooter";
import { CoreDefence } from "../WGA/views/games/coreDefence/CoreDefence";
import { CastleDefence } from "../WGA/views/games/castleDefence/CastleDefence";

export class WGAApp implements IUpdateable, IDrawable {
    private pause: boolean;
    private currentGame: WGAGameContainer;

    constructor() {
        this.pause = true;

        Data.I.Pages.CreatePage("Main", new MainPage());
        Data.I.Pages.CreatePage("CameraTest", new CameraTest());
        Data.I.Pages.CreatePage("CollisionTest", new CollisionTest());

        Data.I.Pages.CreatePage("ZombieShooter", new ZombieShooter());
        Data.I.Pages.CreatePage("CoreDefence", new CoreDefence());
        Data.I.Pages.CreatePage("CastleDeffence", new CastleDefence());

        Data.I.Pages.InstantNavigateTo("Main");
    }

    public Update(timeDelta: number): void {
        if (this.pause == true) {
            Data.I.Pages.Update(timeDelta);
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.Update(timeDelta);
        }
    }

    public Draw(): void {
        if (this.pause == true) {
            Data.I.Draw.adjustMenuViewToCamera();
            Data.I.Pages.Draw();
            Data.I.Draw.removeCameraInfuence();
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.DrawGame();
        }
    }
}
