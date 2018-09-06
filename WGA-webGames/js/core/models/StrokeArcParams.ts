module WGAAppModule {
    'use strict';

    export class StrokeArcParams extends FillArcParams {
        public thickness: number;

        constructor(params: FillArcParams, thickness: number) {
            super(params, params.startAngle, params.endAngle);
            this.thickness = thickness;
        }

        public static Normilize(item: StrokeArcParams): void {
            FillArcParams.Normilize(item);
            if (item.thickness == null) { item.thickness = 1; }
        }
    }
}