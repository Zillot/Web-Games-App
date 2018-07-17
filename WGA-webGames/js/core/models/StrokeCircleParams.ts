module WGAAppModule {
    'use strict';

    export class StrokeCircleParams extends FillCircleParams {
        public thickness: number;

        constructor(params: FillCircleParams, thickness: number) {
            super(params, params.radius);
            this.thickness = thickness;
        }

        public static Normilize(item: StrokeCircleParams): void {
            FillCircleParams.Normilize(item);
            if (item.thickness == null) { item.thickness = 1; }
        }
    }
}