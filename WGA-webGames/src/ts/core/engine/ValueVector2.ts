import { Value } from './Value';
import { Vector2 } from './Vector2';

export class ValueVector2 {
    public X: Value;
    public Y: Value;

    constructor() {
        
    }

    public GoTo(vector: Vector2) {
        this.X.GoTo(vector.X);
        this.Y.GoTo(vector.Y);
    }
}
