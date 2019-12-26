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
        uiComponents.push(MainPageUI.SelectGame1Btn);
        uiComponents.push(MainPageUI.SelectGame2Btn);
        uiComponents.push(MainPageUI.SelectGame3Btn);
        uiComponents.push(MainPageUI.EsternEqq1Btn);
        uiComponents.push(MainPageUI.CamTestBtn);
        uiComponents.push(MainPageUI.CollisionTestBtn);

        uiComponents.push(MainPageUI.GetB(100));
        uiComponents.push(new MainIco(new Vector2(100, 100), 40, 3, 1));
        uiComponents.push(MainPageUI.GetB(150));
        uiComponents.push(new SpinnerIco(new Vector2(100, 150), 40, 10, 2));
        uiComponents.push(MainPageUI.GetB(200));
        uiComponents.push(new LevelUpIco(new Vector2(100, 200), 40, 4));
    }

    public static GetB(x: number) {
        return Button.GetButton({
            name: "btn" + x,
            text: "",
            position: new Vector2(100, x),
            size: new Vector2(40, 40),
            backgroundcolor: Color4.White
        });
    }

    public static selectGame1Btn: Button;
    public static get SelectGame1Btn() {
        if (this.selectGame1Btn == null) {
            this.selectGame1Btn = Button.GetButton({
                name: "SelectGame1Btn",
                text: "Play Zombie Shooter",
                onClick: function () {
                    Pages.I.NavigateTo("ZombieShooter");
                },
                position: new Vector2(Data.I.Center.X, 300),
                size: new Vector2(200, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.selectGame1Btn;
    }

    public static selectGame2Btn: Button;
    public static get SelectGame2Btn() {
        if (this.selectGame2Btn == null) {
            this.selectGame2Btn = Button.GetButton({
                name: "SelectGame2Btn",
                text: "Play Core Defence",
                onClick: function () {
                    Pages.I.NavigateTo("CoreDefence");
                },
                position: new Vector2(Data.I.Center.X, 350),
                size: new Vector2(200, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.selectGame2Btn;
    }

    public static selectGame3Btn: Button;
    public static get SelectGame3Btn() {
        if (this.selectGame3Btn == null) {
            this.selectGame3Btn = Button.GetButton({
                name: "SelectGame3Btn",
                text: "Play Castle Defence",
                onClick: function () {
                    Pages.I.NavigateTo("CastleDeffence");
                },
                position: new Vector2(Data.I.Center.X, 400),
                size: new Vector2(200, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.selectGame3Btn;
    }

    public static esternEqq1Btn: Button;
    public static get EsternEqq1Btn() {
        if (this.esternEqq1Btn == null) {
            this.esternEqq1Btn = Button.GetButton({
                name: "EsternEqq1Btn",
                text: "Blow up a nuclear bomb",
                onClick: function () { },
                position: new Vector2(Data.I.Center.X, 450),
                size: new Vector2(200, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.esternEqq1Btn;
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