import { IUpdateable } from "./interfaces/IUpdateable";
import { IDrawable } from "./interfaces/IDrawable";
import { Value } from "./engine/Value";
import { NavigateMode } from "./models/PageState";
import { Vector2 } from "./engine/Vector2";
import { FillRectParams } from "./models/FillRectParams";
import { Data } from "../app/Setups";
import { Color4 } from "./engine/Color4";
import { CallbackFunction } from "./CallbackFunction";

export class PageTransitionController implements IUpdateable, IDrawable {
    private static SPEED: number = 5;

    private navigateProcess: Value;
    private navigateMode: NavigateMode;

    public constructor() {
        this.navigateMode = NavigateMode.Undefined;
        this.navigateProcess = new Value(0, PageTransitionController.SPEED);
        this.navigateProcess.SetMultypliCallbacksState(true);
            
    }

    public PrepareToInstantNavigating() {
        this.navigateProcess.SetValue(1);
    }

    public NavigateToStart(finishEvent: CallbackFunction) {
        this.navigateMode = NavigateMode.Entering;

        this.navigateProcess.GoTo(1, PageTransitionController.SPEED, () => {
            this.navigateMode = NavigateMode.Still;
            finishEvent();
        });
    }

    public NavigateFromStart(finishEvent: CallbackFunction) {
        this.navigateMode = NavigateMode.Leaving;

        this.navigateProcess.GoTo(0, PageTransitionController.SPEED, () => {
            this.navigateMode = NavigateMode.Navigated;
            finishEvent();
        });
    }

    public Update(timeDelta: number): void {
        this.navigateProcess.Update(timeDelta);
    }

    public Draw(): void {
        var value = this.navigateProcess.GetVal();

        if (this.navigateMode == NavigateMode.Navigated) {
            value = 1;
        }

        if (this.navigateMode == NavigateMode.Entering || this.navigateMode == NavigateMode.Leaving || this.navigateMode == NavigateMode.Still) {
            Data.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Data.I.WindowWidth, Data.I.WindowHeight), origin: new Vector2(-1, -1), color: Color4.Black.GetTransparent(value) });
        }
    }
}
