import { Color4 } from "../engine/Color4";
import { Vector2 } from "../engine/Vector2";

export class Utils {
    //include min and max
    public RandI(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //include min and max
    public RandF(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    public RandColor(): Color4 {
        return new Color4(this.RandI(0, 255), this.RandI(0, 255), this.RandI(0, 255), 1);
    }
    public RandVector(): Vector2 {
        return Vector2.Left.RotateTo(this.RandF(0, Math.PI * 2));
    }
}
