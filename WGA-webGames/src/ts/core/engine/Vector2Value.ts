import { TransitionValue } from './TransitionValue';
import { Vector2 } from './Vector2';
import { CallbackFunction } from '../CallbackFunction';

export class Vector2Value extends Vector2 {
    private xVal: TransitionValue;
    private yVal: TransitionValue;

    constructor(x?: Vector2 | number, y?: number) {
        super(x, y)
    }

    static fromVector2(vector2: Vector2): Vector2Value {
        return new Vector2Value(vector2.X, vector2.Y)
    }

    public get X(): number {
        return this.xVal.GetVal();
    }
    public get Y(): number {
        return this.yVal.GetVal();
    }
    public set X(value: number) {
        this.xVal.SetValue(value);
    }
    public set Y(value: number) {
        this.yVal.SetValue(value);
    }

    public GoToDeltaWithGoal(delta: Vector2, speed?: number, callback?: CallbackFunction): void {
        this.xVal.GoToDeltaWithGoal(delta.X, speed, callback);
        this.yVal.GoToDeltaWithGoal(delta.Y, speed, callback);
    }

    public GoToDelta(delta: Vector2, speed?: number, callback?: CallbackFunction): void {
        this.xVal.GoToDelta(delta.X, speed, callback);
        this.yVal.GoToDelta(delta.Y, speed, callback);
    }

    public GoTo(value: Vector2, speed?: number, callback?: CallbackFunction): void {
        this.xVal.GoTo(value.X, speed, callback);
        this.yVal.GoTo(value.Y, speed, callback);
    }

    public Update(timeDelta: number): void {
        this.xVal.Update(timeDelta);
        this.yVal.Update(timeDelta);

        super.Update(timeDelta);
    }
}
