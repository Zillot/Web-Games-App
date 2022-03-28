import { FillRectParams } from "./FillRectParams";

export class StrokeRectParams extends FillRectParams {
    public thickness: number;

    constructor(params: FillRectParams, thickness: number) {
        super(params, params.size);
        this.thickness = thickness;
    }

    public static Normilize(item: StrokeRectParams): void {
        FillRectParams.Normilize(item);
        if (item.thickness == null) { item.thickness = 1; }
    }
}
