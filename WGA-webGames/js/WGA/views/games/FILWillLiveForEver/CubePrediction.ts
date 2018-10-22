/// <reference path="../../../common/Unit.ts"/>

module WGAAppModule {
    'use strict';

    export class CubePrediction extends Cube {
        constructor(position: Vector2, fieldPosition: Vector2, size: Vector2, speed: number, color: Color4) {
            super(position, fieldPosition, size, speed, color);
        }

        public DrawPrediction(fieldOffset: Vector2, cubeSize: Vector2): void {
            super.Draw();

            var position = fieldOffset.ADD(cubeSize.MUL(this.FieldPosition));

            Setups.I.Draw.RectFill(<FillRectParams>{
                position: position,
                size: this.Size,
                scale: this.Transition.GetVal() * 0.2,
                color: Color4.Black.GetTransparent(this.Opacity.GetVal()),
                origin: new Vector2(0, 0)
            });
        }
    }
}