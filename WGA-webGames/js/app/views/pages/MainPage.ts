/// <reference path="../../models/abstracts/Page.ts"/>

module WGAAppModule {
    'use strict';

    export class MainPage extends Page {
        constructor() {
            super();

            this.Buttons.push(Button.GetButton({
                name: "SelectGame1Btn",
                text: "Play Zombie Shooter",
                onClick: function () {
                    Setups.I.App.SelectGameByName('zombieShooter')
                },
                position: new Vector2(Setups.I.Center.X, 300),
                size: new Vector2(200, 40),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "SelectGame2Btn",
                text: "Play Core Defence",
                onClick: function () {
                    Setups.I.App.SelectGameByName('coreDefence')
                },
                position: new Vector2(Setups.I.Center.X, 350),
                size: new Vector2(200, 40),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "SelectGame3Btn",
                text: "Play Castle Defence",
                onClick: function () {
                    Setups.I.App.SelectGameByName('castleDeffence')
                },
                position: new Vector2(Setups.I.Center.X, 400),
                size: new Vector2(200, 40),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "EsternEqq1Btn",
                text: "Blow up a nuclear bomb",
                onClick: function () { },
                position: new Vector2(Setups.I.Center.X, 450),
                size: new Vector2(200, 40),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "CamTestBtn",
                text: "Cam Test",
                onClick: function () {
                    Setups.I.Pages.NavigateTo("CameraTest");
                },
                position: new Vector2(Setups.I.WindowWidth - 60, 30),
                size: new Vector2(100, 40),
                color: Color4.Blue()
            }));
        }

        public Draw() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight), origin: new Vector2(-1, -1), color: Color4.Black().GetTransparent(0.5) });

            super.Draw();

            Setups.I.Draw.TextFill(<TextParams>{ str: 'Web games app', position: new Vector2(Setups.I.Center.X, 100), color: Color4.White(), fontSize: 50, origin: new Vector2(0) });
            Setups.I.Draw.TextFill(<TextParams>{ str: 'Main menu', position: new Vector2(Setups.I.Center.X, 150), color: Color4.White(), fontSize: 30, origin: new Vector2(0) });
        }
    }
}