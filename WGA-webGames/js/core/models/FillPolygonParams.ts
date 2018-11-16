module WGAAppModule {
    'use strict';

    export class FillPolygonParams extends StandartParams {
        public points: Vector2[];

        constructor(params: StandartParams, points: Vector2[]) {
            super(params);
            this.points = points;
        }

        public static Normilize(item: FillPolygonParams): void {
            StandartParams.Normilize(item);
            if (item.points == null) { item.points = [new Vector2(0, 0)]; }
        }
    }
}