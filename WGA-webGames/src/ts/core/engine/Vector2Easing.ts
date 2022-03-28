import { CallbackFunction } from '../CallbackFunction';
import { Vector2 } from './Vector2';
import { ValueEasing } from './ValueEasing';
import { EasingMode } from './EasingMode';

export class Vector2Easing extends Vector2 {
    private xVal: number;
    private yVal: number;

    private direction: Vector2 = null;
    private distance: number;
    private value: ValueEasing;

    constructor(x?: Vector2 | number, y?: number) {
        super(x, y)
        this.value = new ValueEasing(1, EasingMode.linear);
    }

    static fromVector2(vector2: Vector2): Vector2Easing {
        return new Vector2Easing(vector2.X, vector2.Y);
    }

    public v2() {
        return new Vector2(this.X, this.Y);
    }

    public isStable() {
        return this.value.isStable();
    }

    public get X(): number {
        if (this.direction != null) {
            var delta = this.direction.MUL(this.value.GetVal() * this.distance);
            return this.xVal + delta.X;
        }
        else {
            return this.xVal;
        }
    }
    public get Y(): number {
        if (this.direction != null) {
            var delta = this.direction.MUL(this.value.GetVal() * this.distance);
            return this.yVal + delta.Y;
        }
        else {
            return this.yVal;
        }
    }
    public set X(value: number) {
        this.xVal = value;
    }
    public set Y(value: number) {
        this.yVal = value;
    }

    public GoTo(vector: Vector2, ms?: number, easing?: EasingMode, callback?: CallbackFunction): void {
        this.value.SetEasing(easing);
        this.value.SetCallback(callback);
        this.value.Restart(ms);
        this.distance = vector.SUB(this).Length();
        this.direction = vector.SUB(this).Normalize();
    }

    public Update(timeDelta: number): void {
        this.value.Update(timeDelta);

        if (this.value.isStable()) {
            this.X = this.X;
            this.Y = this.Y;

            this.direction = null;
        }

        super.Update(timeDelta);
    }
}
