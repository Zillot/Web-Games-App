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

        public Normilize(item: FillArcParams): void {
            FillCircleParams.Normilize(item);
            if (this.startAngle == null) { this.startAngle = 0; }
            if (this.endAngle == null) { this.endAngle = Draw.PI(); }
        }
    }
}