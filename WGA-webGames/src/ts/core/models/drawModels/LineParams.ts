import { Color4 } from "../../engine/Color4";
import { Vector2 } from "../../engine/Vector2";

export class LineParams {
    public pointFrom: Vector2;
    public pointTo: Vector2;
    public thickness: number;
    public color: Color4;

    public static Normilize(item: LineParams): void {
        if (item.pointFrom == null) { throw "pointFrom can not be null"; }
        if (item.pointTo == null) { throw "pointTo can not be null"; }
        if (item.thickness == null) { item.thickness = 1; }
        if (item.color == null) { item.color = new Color4(0, 0, 0, 1); }
    }
}
