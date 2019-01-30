/// <reference path="../../../core/abstracts/Page.ts"/>

module WGAAppModule {
    'use strict';

    export class CameraTest extends Page {
        public angleCon: Value;
        
        constructor() {
            super();

            CameraTestUI.SetupUI(this.UiComponents);
        }

        public Init(): void {
            this.angleCon = new Value(0, 3);
            this.angleCon.GoTo(20);

            super.Init();
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
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight), color: Color4.Gray.GetTransparent(0.1), origin: new Vector2(-1, -1) });
        }

        public DrawText() {
            Setups.I.Draw.TextFill(<TextParams>{ str: 'test text 1', position: new Vector2(200, 200), color: Color4.Black, fontSize: 50, origin: new Vector2(0), angle: this.angleCon.GetVal() });
            Setups.I.Draw.TextFill(<TextParams>{ str: 'test text 2', position: new Vector2(200, 350), color: Color4.Black, fontSize: 30, origin: new Vector2(0) });
        }

        public DrawRotatingRectangles() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(400, 200), size: new Vector2(50, 50), color: Color4.Red.GetTransparent(0.2), angle: this.angleCon.GetVal() / 2 });
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(400, 220), size: new Vector2(50, 50), color: Color4.Purple.GetTransparent(0.2), angle: -this.angleCon.GetVal() / 2 });
        }

        public DrawFigures() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(Setups.I.Center.X, 500), size: new Vector2(200, 50), color: Color4.Blue });
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: Setups.I.Center, radius: 10, color: Color4.Red });
        }

        public DrawMousePosition() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: Setups.I.Input.GetMousePosition(), size: new Vector2(10, 10), color: Color4.Blue });
        }
    }
}