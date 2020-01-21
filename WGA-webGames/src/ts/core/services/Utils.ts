import { Injectable } from '@angular/core';
import { Color4 } from "../engine/Color4";
import { Vector2 } from "../engine/Vector2";

@Injectable()
export class Utils {
    public static PI2() { return 6.283185307179586476925286766559; }
    public static PI() { return 3.1415926535897932384626433832795; }

    //include min and max
    public static RandI(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //include min and max
    public static RandF(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    public static RandColor(): Color4 {
        return new Color4(Utils.RandI(0, 255), Utils.RandI(0, 255), Utils.RandI(0, 255), 1);
    }
    public static RandVector(): Vector2 {
        return Vector2.Left.RotateTo(Utils.RandF(0, Math.PI * 2));
    }
}
