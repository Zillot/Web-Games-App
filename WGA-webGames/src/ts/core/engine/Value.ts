import { CallbackFunction } from "../CallbackFunction";
import { Easing } from "./Easing";

export class Value {
    private value: number;
    private valueGoal: number;
    private speed: number;
    private callbacks: CallbackFunction[];
    private dir: number;
    private pause: number;

    private multypliCallbacks: boolean;

    constructor(value: number, speed: number) {
        this.ClearCallback();

        this.value = value;
        this.valueGoal = value;
        this.speed = speed;
        this.dir = 1;
        this.pause = 1;

        this.multypliCallbacks = false;
    }

    public SetMultypliCallbacksState(state: boolean) {
        this.multypliCallbacks = state;
    }

    public ClearCallback(): void {
        this.callbacks = [];
    }

    public SetCallback(callback: CallbackFunction) {
        this.callbacks.push(callback);
    }

    public Stop(cancelCallback: CallbackFunction): void {
        this.value = this.valueGoal;

        if (cancelCallback) {
            this.ClearCallback();
        }
    }

    public Play(): void {
        this.pause = 1;
    }

    public Pause(): void {
        this.pause = 0;
    }

    public GetVal(): number {
        return this.value;
    }

    public GetGoalVal(): number {
        return this.valueGoal;
    }

    public SetValue(value: number): void {
        this.valueGoal = value;
        this.value = value;
        this.pause = 0;
    }

    public GoToDeltaWithGoal(delta: number, speed?: number, callback?: CallbackFunction, easing?: Easing): number {
        this.GoTo(this.valueGoal + delta, speed, callback);

        return this.valueGoal;
    }

    public GoToDelta(delta: number, speed?: number, callback?: CallbackFunction, easing?: Easing): number {
        this.GoTo(this.value + delta, speed, callback, easing);

        return this.valueGoal;
    }

    public GoTo(value: number, speed?: number, callback?: CallbackFunction, easing?: Easing): void {
        this.pause = 1;

        if (this.callbacks) {
            this.callbacks.push(callback);
        }

        if (speed != null) {
            this.speed = speed;
        }

        this.valueGoal = value;

        if (this.value < value) {
            this.dir = 1;
        }
        else if (this.value > value) {
            this.dir = -1;
        }
        else if (this.value == value && !this.multypliCallbacks) {
            this.dir = 0;
        }
    }

    public isStable() {
        return this.dir == 0;
    }

    public Update(timeDelta: number): void {
        this.value += this.speed * this.dir * timeDelta * this.pause;

        if (this.dir == 1 && this.value >= this.valueGoal || this.dir == -1 && this.value <= this.valueGoal) {
            this.value = this.valueGoal;
            this.dir = 0;

            var callbacksToCall = this.callbacks;
            this.ClearCallback();

            for (var i = 0; i < callbacksToCall.length; i++) {
                if (callbacksToCall[i]) {
                    callbacksToCall[i]();
                }
            }
        }
    }
}
