import { IUiComponent } from "../../../core/ui/Interfaces/IUiComponent";
import { MainIco } from "../../common/Icons/MainIco";
import { SpinnerIco } from "../../common/Icons/SpinnerIco";
import { Vector2 } from "../../../core/engine/Vector2";
import { Button } from "../../../core/ui/Button";
import { Data } from "../../../app/Data";
import { Color4 } from "../../../core/engine/Color4";
import { Pages } from 'src/ts/core/services/Pages';
import { LevelUpIco } from '../../common/Icons/LevelUpIco';

export class MainPageUI {
    public static SetupUI(uiComponents: IUiComponent[]) {
        uiComponents.push(MainPageUI.PlayYotaBtn);

        /*uiComponents.push(MainPageUI.PlayZombieShooterBtn);
        uiComponents.push(MainPageUI.PlayCoreDefBtn);
        uiComponents.push(MainPageUI.PlayCastleDefBtn);
        uiComponents.push(MainPageUI.CamTestBtn);
        uiComponents.push(MainPageUI.CollisionTestBtn);*/

        /*uiComponents.push(MainPageUI.GetB(100));
        uiComponents.push(new MainIco(new Vector2(100, 100), 40, 3, 1));
        uiComponents.push(MainPageUI.GetB(150));
        uiComponents.push(new SpinnerIco(new Vector2(100, 150), 40, 10, 2));
        uiComponents.push(MainPageUI.GetB(200));
        uiComponents.push(new LevelUpIco(new Vector2(100, 200), 40, 4));*/
    }

    public static playYotaBtn: Button;
    public static get PlayYotaBtn() {
        if (this.playYotaBtn == null) {
            this.playYotaBtn = Button.GetButton({
                name: "playYota",
                text: "Play Yota",
                onClick: function () {
                    Pages.I.NavigateTo("YotaOnline");
                },
                position: new Vector2(Data.I.Center.X, 300),
                size: new Vector2(200, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.playYotaBtn;
    }

    public static playZombieShooterBtn: Button;
    public static get PlayZombieShooterBtn() {
        if (this.playZombieShooterBtn == null) {
            this.playZombieShooterBtn = Button.GetButton({
                name: "playZombieShooter",
                text: "Play Zombie Shooter",
                onClick: function () {
                    Pages.I.NavigateTo("ZombieShooter");
                },
                position: new Vector2(Data.I.Center.X, 300),
                size: new Vector2(200, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.playZombieShooterBtn;
    }

    public static playCoreDefBtn: Button;
    public static get PlayCoreDefBtn() {
        if (this.playCoreDefBtn == null) {
            this.playCoreDefBtn = Button.GetButton({
                name: "playCoreDefence",
                text: "Play Core Defence",
                onClick: function () {
                    Pages.I.NavigateTo("CoreDefence");
                },
                position: new Vector2(Data.I.Center.X, 350),
                size: new Vector2(200, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.playCoreDefBtn;
    }

    public static playCastleDefBtn: Button;
    public static get PlayCastleDefBtn() {
        if (this.playCastleDefBtn == null) {
            this.playCastleDefBtn = Button.GetButton({
                name: "playCastleDefence",
                text: "Play Castle Defence",
                onClick: function () {
                    Pages.I.NavigateTo("CastleDeffence");
                },
                position: new Vector2(Data.I.Center.X, 400),
                size: new Vector2(200, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.playCastleDefBtn;
    }

    public static camTestBtn: Button;
    public static get CamTestBtn() {
        if (this.camTestBtn == null) {
            this.camTestBtn = Button.GetButton({
                name: "CamTestBtn",
                text: "Cam Test",
                onClick: function () {
                    Pages.I.NavigateTo("CameraTest");
                },
                position: new Vector2(Data.I.WindowSize.X - 60, 30),
                size: new Vector2(100, 40),
                backgroundcolor: Color4.Cyan
            });
        }


        return this.camTestBtn;
    }

    public static collisionTestBtn: Button;
    public static get CollisionTestBtn() {
        if (this.collisionTestBtn == null) {
            this.collisionTestBtn = Button.GetButton({
                name: "CollisionTestBtn",
                text: "Collision Test",
                onClick: function () {
                    Pages.I.NavigateTo("CollisionTest");
                },
                position: new Vector2(Data.I.WindowSize.X - 60, 80),
                size: new Vector2(100, 40),
                backgroundcolor: Color4.Cyan
            });
        }

        return this.collisionTestBtn;
    }
}
