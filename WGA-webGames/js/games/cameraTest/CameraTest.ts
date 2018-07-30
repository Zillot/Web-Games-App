/// <reference path="../../app/models/abstracts/WGAGame.ts"/>

module WGAAppModule {
    'use strict';

    export class CameraTest extends WGAGame {
        public angleCon: Value;

        constructor() {
            super();

            this.Buttons.push(Button.GetButton({
                name: "upBtn",
                text: "up",
                onClick: function () {
                    var camera = Setups.I.Draw.GetCameraPosition();
                    Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(0, -100)));
                },
                position: new Vector2(Setups.I.WindowWidth - 20, 20),
                size: new Vector2(30, 30),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "downBtn",
                text: "down",
                onClick: function () {
                    var camera = Setups.I.Draw.GetCameraPosition();
                    Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(0, 100)));
                },
                position: new Vector2(Setups.I.WindowWidth - 20, 60),
                size: new Vector2(30, 30),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "rightBtn",
                text: "right",
                onClick: function () {
                    var camera = Setups.I.Draw.GetCameraPosition();
                    Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(100, 0)));
                },
                position: new Vector2(Setups.I.WindowWidth - 20, 100),
                size: new Vector2(30, 30),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "leftBtn",
                text: "left",
                onClick: function () {
                    var camera = Setups.I.Draw.GetCameraPosition();
                    Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(-100, 0)));
                },
                position: new Vector2(Setups.I.WindowWidth - 20, 140),
                size: new Vector2(30, 30),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "zpBtn",
                text: "z+",
                onClick: function () {
                    var camera = Setups.I.Draw.GetCameraZoom();
                    Setups.I.Draw.SetCameraZoom(camera + 0.05);
                },
                position: new Vector2(Setups.I.WindowWidth - 20, 180),
                size: new Vector2(30, 30),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "zmBtn",
                text: "z-",
                onClick: function () {
                    var camera = Setups.I.Draw.GetCameraZoom();
                    Setups.I.Draw.SetCameraZoom(camera - 0.05);
                },
                position: new Vector2(Setups.I.WindowWidth - 20, 220),
                size: new Vector2(30, 30),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "rpBtn",
                text: "r+",
                onClick: function () {
                    var camera = Setups.I.Draw.GetCameraAngle();
                    Setups.I.Draw.SetCameraAngle(camera + 0.05);
                },
                position: new Vector2(Setups.I.WindowWidth - 20, 260),
                size: new Vector2(30, 30),
                color: Color4.White()
            }));

            this.Buttons.push(Button.GetButton({
                name: "rmBtn",
                text: "r-",
                onClick: function () {
                    var camera = Setups.I.Draw.GetCameraAngle();
                    Setups.I.Draw.SetCameraAngle(camera - 0.05);
                },
                position: new Vector2(Setups.I.WindowWidth - 20, 300),
                size: new Vector2(30, 30),
                color: Color4.White()
           }));

           this.Buttons.push(Button.GetButton({
               name: "rstBtn",
               text: "rst",
               onClick: function () {
                   Setups.I.Draw.ResetCamera();
               },
               position: new Vector2(Setups.I.WindowWidth - 20, 340),
               size: new Vector2(30, 30),
               color: Color4.White()
           }));
        }

        public Init(): void {
            this.angleCon = new Value(0, 3);
            this.angleCon.GoTo(20);
        }

        public Update(timeDelta: number): void {
            this.angleCon.Update(timeDelta);

            if (this.angleCon.GetVal() == 20) {
                this.angleCon.GoTo(0);
            }
            if (this.angleCon.GetVal() == 0) {
                this.angleCon.GoTo(20);
            }
        }

        public Draw(): void {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight), color: Color4.Gray().GetTransparent(0.1), origin: new Vector2(-1, -1) });

            Setups.I.Draw.TextFill(<TextParams>{ str: 'test text 1', position: new Vector2(200, 200), color: Color4.Black(), fontSize: 50, origin: new Vector2(0), angle: this.angleCon.GetVal() });
            Setups.I.Draw.TextFill(<TextParams>{ str: 'test text 2', position: new Vector2(200, 350), color: Color4.Black(), fontSize: 30, origin: new Vector2(0) });

            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(400, 200), size: new Vector2(50, 50), color: Color4.Red().GetTransparent(0.2), angle: this.angleCon.GetVal() / 2 });
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(400, 220), size: new Vector2(50, 50), color: Color4.Purple().GetTransparent(0.2), angle: -this.angleCon.GetVal() / 2 });

            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(Setups.I.Center.X, 500), size: new Vector2(200, 50), color: Color4.Blue() });
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: Setups.I.Center, radius: 10, color: Color4.Red() });
        }
    }
}