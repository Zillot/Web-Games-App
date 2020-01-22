import { BaseUIComponent } from 'src/ts/core/ui/BaseUIComponent';
import { TransitionValue } from '../engine/TransitionValue';
import { Vector2 } from '../engine/Vector2';
import { IUpdateable } from '../interfaces/IUpdateable';
import { IDrawable } from '../interfaces/IDrawable';

export abstract class BaseIco extends BaseUIComponent implements IUpdateable, IDrawable {
    public Name: string;

    protected speed: number;

    protected proccess: TransitionValue;

    constructor(speed: number, position: Vector2) {
        super(position);

        this.proccess = new TransitionValue(0, speed);
        this.startMoving();
    }

    public Pause() {
        this.proccess.Pause();
    }

    public Play() {
        this.proccess.Play();
    }

    public Update(timeDelta: number): void {
        this.proccess.Update(timeDelta);
    }

    protected startMoving() {
        this.proccess.GoTo(1, this.speed, () => {
            this.endMoving();
        });
    }

    protected endMoving() {
        this.proccess.GoTo(0, this.speed, () => {
            this.startMoving();
        });
    }
}
