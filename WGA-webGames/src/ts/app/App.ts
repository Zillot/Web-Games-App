import { IUpdateable } from "../core/interfaces/IUpdateable";
import { Setups } from "./Setups";
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

        Setups.I.Pages.CreatePage("Main", new MainPage());
        Setups.I.Pages.CreatePage("CameraTest", new CameraTest());
        Setups.I.Pages.CreatePage("CollisionTest", new CollisionTest());

        Setups.I.Pages.CreatePage("ZombieShooter", new ZombieShooter());
        Setups.I.Pages.CreatePage("CoreDefence", new CoreDefence());
        Setups.I.Pages.CreatePage("CastleDeffence", new CastleDefence());

        Setups.I.Pages.InstantNavigateTo("Main");
    }

    public Update(timeDelta: number): void {
        if (this.pause == true) {
            Setups.I.Pages.Update(timeDelta);
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.Update(timeDelta);
        }
    }

    public Draw(): void {
        if (this.pause == true) {
            Setups.I.Draw.adjustMenuViewToCamera();
            Setups.I.Pages.Draw();
            Setups.I.Draw.removeCameraInfuence();
        }

        if (this.currentGame != null && this.pause == false) {
            this.currentGame.Game.DrawGame();
        }
    }
}
