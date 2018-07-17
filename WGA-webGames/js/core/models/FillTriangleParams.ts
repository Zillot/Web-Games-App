module WGAAppModule {
    'use strict';

    export class FillTriangleParams extends StandartParams {
        public size: Vector2;

        constructor(params: StandartParams, size: Vector2) {
            super(params);
            this.size = size;
        }

        public static Normilize(item: FillRectParams): void {
            StandartParams.Normilize(item);
            if (item.size == null) { item.size = new Vector2(0, 0); }
        }
    }
}