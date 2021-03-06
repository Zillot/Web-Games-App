module WGAAppModule {
    'use strict';

    export class ImageParams extends StandartParams {
        public size: Vector2;

        constructor(params: StandartParams, fontName: string, fontSize: number) {
            super(params);
        }

        public Normilize(item: ImageParams): void {
            StandartParams.Normilize(item);
            if (item.size == null) { item.size = new Vector2(0, 0); }
        }
    }
}