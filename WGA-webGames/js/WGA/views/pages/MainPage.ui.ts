/// <reference path="../../../core/ui/Button.ts"/>
/// <reference path="../../../core/engine/Color4.ts"/>
/// <reference path="../../../core/engine/Vector2.ts"/>
/// <reference path="../../../app/Setups.ts"/>

module WGAAppModule {
    'use strict';

    export class MainPageUI {
        public static SetupUI(uiComponents: IUiComponent[]) {
            uiComponents.push(MainPageUI.SelectGame1Btn);
            uiComponents.push(MainPageUI.SelectGame2Btn);
            uiComponents.push(MainPageUI.SelectGame3Btn);
            uiComponents.push(MainPageUI.EsternEqq1Btn);
            uiComponents.push(MainPageUI.CamTestBtn);
            uiComponents.push(MainPageUI.CollisionTestBtn);
            
            uiComponents.push(new MainIco(new Vector2(100, 100), 30, 3, 1));
            uiComponents.push(new SpinnerIco(new Vector2(100, 100), 20, 10, 2));
        }

        public static selectGame1Btn: Button;
        public static get SelectGame1Btn() {
            if (this.selectGame1Btn == null) {
                this.selectGame1Btn = Button.GetButton({
                    name: "SelectGame1Btn",
                    text: "Play Zombie Shooter",
                    onClick: function () {
                        Setups.I.Pages.NavigateTo("ZombieShooter");
                    },
                    position: new Vector2(Setups.I.Center.X, 300),
                    size: new Vector2(200, 40),
                    color: Color4.White
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
                        Setups.I.Pages.NavigateTo("CoreDefence");
                    },
                    position: new Vector2(Setups.I.Center.X, 350),
                    size: new Vector2(200, 40),
                    color: Color4.White
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
                        Setups.I.Pages.NavigateTo("CastleDeffence");
                    },
                    position: new Vector2(Setups.I.Center.X, 400),
                    size: new Vector2(200, 40),
                    color: Color4.White
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
                    position: new Vector2(Setups.I.Center.X, 450),
                    size: new Vector2(200, 40),
                    color: Color4.White
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
                        Setups.I.Pages.NavigateTo("CameraTest");
                    },
                    position: new Vector2(Setups.I.WindowWidth - 60, 30),
                    size: new Vector2(100, 40),
                    color: Color4.Cyan
                })
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
                        Setups.I.Pages.NavigateTo("CollisionTest");
                    },
                    position: new Vector2(Setups.I.WindowWidth - 60, 80),
                    size: new Vector2(100, 40),
                    color: Color4.Cyan
                })
            }

            return this.collisionTestBtn;
        }
    }
}