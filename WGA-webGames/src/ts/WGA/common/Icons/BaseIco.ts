import { IUpdateable } from "../../../core/interfaces/IUpdateable";
import { IDrawable } from "../../../core/interfaces/IDrawable";
import { Vector2 } from "../../../core/engine/Vector2";
import { Value } from "../../../core/engine/Value";
import { BaseUIComponent } from 'src/ts/core/ui/BaseUIComponent';

export abstract class BaseIco extends BaseUIComponent implements IUpdateable, IDrawable {
    public Name: string;

    protected speed: number;

    protected proccess: Value;

    constructor(speed: number) {
        super(Vector2.Zero);

        this.proccess = new Value(0, speed);
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

    private startMoving() {
        this.proccess.GoTo(1, this.speed, () => {
            this.endMoving();
        });
    }

    private endMoving() {
        this.proccess.GoTo(0, this.speed, () => {
            this.startMoving();
        });
    }
}
