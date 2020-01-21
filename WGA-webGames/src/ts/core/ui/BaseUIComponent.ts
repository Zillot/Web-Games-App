import { IUiComponent } from './Interfaces/IUiComponent';
import { Vector2 } from '../engine/Vector2';
import { TransitionValue } from '../engine/Value';
import { Draw } from '../services/Draw';

export abstract class BaseUIComponent implements IUiComponent {
    public Name: string;

    protected onClick: any;

    protected offset: Vector2;
    protected position: Vector2;
    protected opacity: TransitionValue;

    public get Position(): Vector2 {
        return this.position;
    }

    constructor(position: Vector2) {
        this.position = position;
        this.opacity = new TransitionValue(1, 1);
        this.offset = new Vector2(0);
    }

    public abstract Init(): void;

    public abstract Dispose(): void;

    public MoveTo(newPosition: Vector2, speed: number): void {
        this.position.GoTo(newPosition, speed);
    }

    //TODO more events
    public SetOnClick(onClick: any) {
        this.onClick = onClick;
    }

    public SetOpacity(value: number): void {
        this.opacity.SetValue(value);
    }

    public SetOffset(value: Vector2): void {
        this.offset = value;
    }

    public Update(timeDelta: number): void {
        this.position.Update(timeDelta);
        this.opacity.Update(timeDelta);
    }

    public abstract Draw(draw: Draw): void;
}
