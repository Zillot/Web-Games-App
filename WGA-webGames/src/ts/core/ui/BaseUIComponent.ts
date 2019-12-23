import { IUiComponent } from './Interfaces/IUiComponent';
import { Vector2 } from '../engine/Vector2';
import { Value } from '../engine/Value';

export abstract class BaseUIComponent implements IUiComponent {
    public Name: string;

    protected position: Vector2;
    protected opacity: Value;

    public get Position(): Vector2 {
        return this.position;
    }

    constructor(position: Vector2) {
        this.position = position;
        this.opacity = new Value(1, 1);
    }

    public abstract Init(): void;

    public abstract Dispose(): void;

    public MoveTo(newPosition: Vector2, speed: number): void {
        this.position.GoTo(newPosition, speed);
    }

    public SetOpacity(value: number): void {
        this.opacity.SetValue(value);
    }

    public Update(timeDelta: number): void {
        this.position.Update(timeDelta);
        this.opacity.Update(timeDelta);
    }

    public abstract Draw(): void;
}
