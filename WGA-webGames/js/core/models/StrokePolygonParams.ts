/// <reference path="./FillPolygonParams.ts"/>

module WGAAppModule {
    'use strict';

    export class StrokePolygonParams extends FillPolygonParams {
        public thickness: number;

        constructor(params: FillPolygonParams, thickness: number) {
            super(params, params.points);
            this.thickness = thickness;
        }

        public static Normilize(item: StrokePolygonParams): void {
            FillPolygonParams.Normilize(item);
            if (item.thickness == null) { item.thickness = 1; }
        }
    }
}