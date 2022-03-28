import { CallbackFunction } from "../CallbackFunction";
import { EasingMode } from "./EasingMode";
import { ValueEasing } from "./ValueEasing";

export class ValueEasingValue {
    private valueEasing: ValueEasing;
    private delta;
    private value;

    constructor(value: number, ms: number, easingMode: EasingMode) {
        this.value = value;
        this.valueEasing = new ValueEasing(ms, easingMode);
        this.delta = 0;
    }

    public ClearCallback(): void {
        this.valueEasing.ClearCallback();
    }

    public SetEasing(easingMode: EasingMode) {
        this.valueEasing.SetEasing(easingMode);
    }

    public SetCallback(callback: CallbackFunction) {
        this.valueEasing.SetCallback(callback);
    }

    public Stop(cancelCallback: CallbackFunction): void {
        this.valueEasing.Stop(cancelCallback);
    }

    public Play(): void {
        this.valueEasing.Play()
    }

    public Pause(): void {
        this.valueEasing.Pause();
    }

    public GetVal(): number {
        return this.value + this.delta * this.valueEasing.GetVal();
    }

    public GoTo(value: number, ms: number): void {
        this.value = this.GetVal();
        this.valueEasing.Restart(ms);
        this.delta = value - this.value;
    }

    public Restart(ms?: number): void {
        this.valueEasing.Restart(ms);
    }

    public isStable() {
        return this.valueEasing.isStable();
    }

    public Update(timeDelta: number): void {
        this.valueEasing.Update(timeDelta);
    }
}
