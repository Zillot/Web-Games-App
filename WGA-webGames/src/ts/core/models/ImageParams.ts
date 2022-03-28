import { StandartParams } from "./StandartParams";
import { Vector2 } from "../engine/Vector2";

export class ImageParams extends StandartParams {
    public size: Vector2;

    constructor(params: StandartParams, fontName: string, fontSize: number) {
        super(params);
    }

    public static Normilize(item: ImageParams): void {
        StandartParams.Normilize(item);
        if (item.size == null) { item.size = new Vector2(0, 0); }
    }
}
