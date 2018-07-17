module WGAAppModule {
    'use strict';

    export class StrokeTriangleParams extends FillTriangleParams {
        public thickness: number;

        constructor(params: FillTriangleParams, thickness: number) {
            super(params, params.size);
            this.thickness = thickness;
        }

        public static Normilize(item: StrokeTriangleParams): void {
            FillRectParams.Normilize(item);
            if (item.thickness == null) { item.thickness = 1; }
        }
    }
}