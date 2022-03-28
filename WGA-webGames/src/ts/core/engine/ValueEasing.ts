import { CallbackFunction } from "../CallbackFunction";
import { EasingMode } from "./EasingMode";
import { Easing } from "./Easing";
import { Value } from "./Value";

export class ValueEasing {
    private valueObj: Value;
    private easing: Easing;

    constructor(ms: number, easingMode: EasingMode) {
        this.valueObj = new Value(0, 1000 / ms);
        this.valueObj.GoTo(1);
        this.valueObj.SetMultypliCallbacksState(true);
        this.easing = new Easing(easingMode);
    }

    public ClearCallback(): void {
        this.valueObj.ClearCallback();
    }

    public SetEasing(easingMode: EasingMode) {
        if (easingMode != null) {
            this.easing = new Easing(easingMode);
        }
    }

    public GoToZero(ms?: number) {
        if (ms == null) {
            ms = 1000;
        }

        this.valueObj.GoTo(0, 1000 / ms);
    }

    public GoToOne(ms?: number) {
        if (ms == null) {
            ms = 1000;
        }

        this.valueObj.GoTo(1, 1000 / ms);
    }

    public SetCallback(callback: CallbackFunction) {
        this.valueObj.SetCallback(callback);
    }

    public Stop(cancelCallback: CallbackFunction): void {
        this.valueObj.Stop(cancelCallback);
    }

    public Play(): void {
        this.valueObj.Play()
    }

    public Pause(): void {
        this.valueObj.Pause();
    }

    public GetVal(): number {
        if (this.easing != null) {
            return this.easing.getValue(this.valueObj.GetVal());
        }
        else {
            return 1;
        }
    }

    public Restart(ms?: number): void {
        if (ms == null) {
            ms = 1000;
        }

        this.valueObj.SetValue(0);
        this.valueObj.GoTo(1, 1000 / ms);
    }

    public isStable() {
        return this.valueObj.isStable();
    }

    public Update(timeDelta: number): void {
        this.valueObj.Update(timeDelta);
    }
}
