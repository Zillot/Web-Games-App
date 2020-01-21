import { Page } from "../../../core/abstracts/Page";
import { TransitionValue } from "../../../core/engine/Value";
import { Data } from "../../../app/Data";
import { FillRectParams } from "../../../core/models/drawModels/FillRectParams";
import { Vector2 } from "../../../core/engine/Vector2";
import { TextParams } from "../../../core/models/drawModels/TextParams";
import { Color4 } from "../../../core/engine/Color4";
import { FillCircleParams } from "../../../core/models/drawModels/FillCircleParams";
import { CameraTestUI } from "./CameraTest.ui";
import { Draw } from 'src/ts/core/services/Draw';
import { Input } from 'src/ts/core/services/Input';

export class CameraTest extends Page {
    public angleCon: TransitionValue;

    constructor(_draw: Draw) {
        super(_draw);

        CameraTestUI.SetupUI(this.UiComponents);
    }

    public Init(): void {
        this.angleCon = new TransitionValue(0, 3);
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
        Data.I.Camera.AdjustViewToCamera();

        this.DrawBackground();
        this.DrawText();
        this.DrawRotatingRectangles();
        this.DrawFigures();
        this.DrawMousePosition();

        Data.I.Camera.RemoveCameraInfuence();

        super.Draw();
    }

    public DrawBackground() {
        this._draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: Data.I.WindowSize, color: Color4.Gray.GetTransparent(0.1), origin: new Vector2(-1, -1) });
    }

    public DrawText() {
        this._draw.TextFill(<TextParams>{ str: 'test text 1', position: new Vector2(200, 200), color: Color4.Black, fontSize: 50, origin: new Vector2(0), angle: this.angleCon.GetVal() });
        this._draw.TextFill(<TextParams>{ str: 'test text 2', position: new Vector2(200, 350), color: Color4.Black, fontSize: 30, origin: new Vector2(0) });
    }

    public DrawRotatingRectangles() {
        this._draw.RectFill(<FillRectParams>{ position: new Vector2(400, 200), size: new Vector2(50, 50), color: Color4.Red.GetTransparent(0.2), angle: this.angleCon.GetVal() / 2 });
        this._draw.RectFill(<FillRectParams>{ position: new Vector2(400, 220), size: new Vector2(50, 50), color: Color4.Purple.GetTransparent(0.2), angle: -this.angleCon.GetVal() / 2 });
    }

    public DrawFigures() {
        this._draw.RectFill(<FillRectParams>{ position: new Vector2(Data.I.Center.X, 500), size: new Vector2(200, 50), color: Color4.Blue });
        this._draw.CircleFill(<FillCircleParams>{ position: Data.I.Center, radius: 10, color: Color4.Red });
    }

    public DrawMousePosition() {
        this._draw.RectFill(<FillRectParams>{ position: Input.I.GetMousePosition(), size: new Vector2(10, 10), color: Color4.Blue });
    }
}
