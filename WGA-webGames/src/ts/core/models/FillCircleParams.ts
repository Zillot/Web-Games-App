import { StandartParams } from "./StandartParams";

export class FillCircleParams extends StandartParams {
    public radius: number;

    constructor(params: StandartParams, radius: number) {
        super(params);
        this.radius = radius;
    }

    public static Normilize(item: FillCircleParams): void {
        StandartParams.Normilize(item);
        if (item.radius == null) { throw "radius can not be null"; }
    }
}
