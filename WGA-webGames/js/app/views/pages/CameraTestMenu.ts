/// <reference path="../../models/abstracts/Page.ts"/>

module WGAAppModule {
    'use strict';

    export class CameraTestMenu extends Page {
        public angleCon: Value;
        
        public UpButton = Button.GetButton({
            name: "upButton",
            text: "up",
            onClick: function () {
                var camera = Setups.I.Draw.GetCameraPosition();
                Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(0, -100)));
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 20),
            size: new Vector2(30, 30),
            color: Color4.White()
        });
        public DownButton = Button.GetButton({
            name: "downButton",
            text: "down",
            onClick: function () {
                var camera = Setups.I.Draw.GetCameraPosition();
                Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(0, 100)));
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 60),
            size: new Vector2(30, 30),
            color: Color4.White()
        });
        public RightButton = Button.GetButton({
            name: "rightButton",
            text: "right",
            onClick: function () {
                var camera = Setups.I.Draw.GetCameraPosition();
                Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(100, 0)));
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 100),
            size: new Vector2(30, 30),
            color: Color4.White()
        });
        public LeftButton = Button.GetButton({
            name: "leftButton",
            text: "left",
            onClick: function () {
                var camera = Setups.I.Draw.GetCameraPosition();
                Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(-100, 0)));
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 140),
            size: new Vector2(30, 30),
            color: Color4.White()
        });
        public ZoomPlusButton = Button.GetButton({
            name: "zpButton",
            text: "z+",
            onClick: function () {
                var camera = Setups.I.Draw.GetCameraZoom();
                Setups.I.Draw.SetCameraZoom(camera + 0.05);
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 180),
            size: new Vector2(30, 30),
            color: Color4.White()
        });
        public ZoomMInusButton = Button.GetButton({
            name: "zmButton",
            text: "z-",
            onClick: function () {
                var camera = Setups.I.Draw.GetCameraZoom();
                Setups.I.Draw.SetCameraZoom(camera - 0.05);
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 220),
            size: new Vector2(30, 30),
            color: Color4.White()
        });
        public RotatePlusButton = Button.GetButton({
            name: "rpButton",
            text: "r+",
            onClick: function () {
                var camera = Setups.I.Draw.GetCameraAngle();
                Setups.I.Draw.SetCameraAngle(camera + 0.05);
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 260),
            size: new Vector2(30, 30),
            color: Color4.White()
        });
        public RotateMinusButton = Button.GetButton({
            name: "rmButton",
            text: "r-",
            onClick: function () {
                var camera = Setups.I.Draw.GetCameraAngle();
                Setups.I.Draw.SetCameraAngle(camera - 0.05);
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 300),
            size: new Vector2(30, 30),
            color: Color4.White()
        });
        public RotateResetButton = Button.GetButton({
            name: "rstButton",
            text: "rst",
            onClick: function () {
                Setups.I.Draw.ResetCamera();
            },
            position: new Vector2(Setups.I.WindowWidth - 20, 340),
            size: new Vector2(30, 30),
            color: Color4.White()
        });

        constructor() {
            super();

            this.Buttons.push(this.UpButton);
            this.Buttons.push(this.DownButton);
            this.Buttons.push(this.RightButton);
            this.Buttons.push(this.LeftButton);
            this.Buttons.push(this.ZoomPlusButton);
            this.Buttons.push(this.ZoomMInusButton);
            this.Buttons.push(this.RotatePlusButton);
            this.Buttons.push(this.RotateMinusButton);
            this.Buttons.push(this.RotateResetButton);
        }

        public Init(): void {
            this.angleCon = new Value(0, 3);
            this.angleCon.GoTo(20);
        }

        public Update(timeDelta: number): void {
            super.Update(timeDelta);

            this.angleCon.Update(timeDelta);

            if (this.angleCon.GetVal() == 20) {
                this.angleCon.GoTo(0);
            }
            if (this.angleCon.GetVal() == 0) {
                this.angleCon.GoTo(20);
            }
        }

        public Draw(): void {
            //game camera applied
            Setups.I.Draw.adjustViewToCamera();

            this.DrawBackground();
            this.DrawText();
            this.DrawRotatingRectangles();
            this.DrawFigures();
            this.DrawMousePosition();

            Setups.I.Draw.removeCameraInfuence();

            super.Draw();
        }

        public DrawBackground() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight), color: Color4.Gray().GetTransparent(0.1), origin: new Vector2(-1, -1) });
        }

        public DrawText() {
            Setups.I.Draw.TextFill(<TextParams>{ str: 'test text 1', position: new Vector2(200, 200), color: Color4.Black(), fontSize: 50, origin: new Vector2(0), angle: this.angleCon.GetVal() });
            Setups.I.Draw.TextFill(<TextParams>{ str: 'test text 2', position: new Vector2(200, 350), color: Color4.Black(), fontSize: 30, origin: new Vector2(0) });
        }

        public DrawRotatingRectangles() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(400, 200), size: new Vector2(50, 50), color: Color4.Red().GetTransparent(0.2), angle: this.angleCon.GetVal() / 2 });
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(400, 220), size: new Vector2(50, 50), color: Color4.Purple().GetTransparent(0.2), angle: -this.angleCon.GetVal() / 2 });
        }

        public DrawFigures() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(Setups.I.Center.X, 500), size: new Vector2(200, 50), color: Color4.Blue() });
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: Setups.I.Center, radius: 10, color: Color4.Red() });
        }

        public DrawMousePosition() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: Setups.I.Input.GetMousePosition(), size: new Vector2(10, 10), color: Color4.Blue() });
        }
    }
}