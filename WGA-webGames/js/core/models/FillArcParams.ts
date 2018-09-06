/// <reference path="FillCircleParams.ts"/>

module WGAAppModule {
    'use strict';

    export class FillArcParams extends FillCircleParams {
        public radius: number;
        public startAngle: number;
        public endAngle: number;

        constructor(params: FillCircleParams, startAngle: number, endAngle: number) {
            super(params, params.radius);
            this.startAngle = startAngle;
            this.endAngle = endAngle;
        }

        public static Normilize(item: FillArcParams): void {
            FillCircleParams.Normilize(item);
            if (item.startAngle == null) { item.startAngle = 0; }
            if (item.endAngle == null) { item.endAngle = Draw.PI() * 2; }
        }
    }
}