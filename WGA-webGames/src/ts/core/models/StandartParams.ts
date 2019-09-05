import { Vector2 } from "../engine/Vector2";
import { Color4 } from "../engine/Color4";

export class StandartParams {
    public position: Vector2;
    public origin: Vector2;
    public color: Color4;
    public angle: number;
    public scale: number | Vector2;

    constructor(params: StandartParams) {
        this.position = params.position;
        this.origin = params.origin;
        this.color = params.color;
        this.angle = params.angle;
        this.scale = params.scale;
    }

    public static Normilize(item: StandartParams): void {
        if (item.position == null) { throw "position can not be null"; }
        if (item.origin == null) { item.origin = new Vector2(0, 0); }
        if (item.color == null) { item.color = new Color4(0, 0, 0, 1); }
        if (item.angle == null) { item.angle = 0; }
        if (item.scale == null) { item.scale = new Vector2(1, 1); }

        if (typeof item.scale == "number") {
            item.scale = new Vector2(item.scale, item.scale);
        }
    }
}
