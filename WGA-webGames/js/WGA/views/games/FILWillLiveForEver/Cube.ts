/// <reference path="../../../common/Unit.ts"/>

module WGAAppModule {
    'use strict';

    export class Cube extends Unit {
        public Color: Color4;
        public Size: Vector2;
        public Transition: Value;
        public Opacity: Value;
        public FieldPosition: Vector2;

        constructor(position: Vector2, fieldPosition: Vector2, size: Vector2, speed: number, color: Color4) {
            super(position, Setups.I.Center.SUB(position).Normalize(), 1, speed, 10);

            this.Transition = new Value(0, 1);
            this.Opacity = new Value(0, 1);

            this.FieldPosition = fieldPosition;
            this.Size = size;
            this.Color = color;
        }

        public Update(timeDelta: number): void {
            super.Update(timeDelta);

            this.Transition.Update(timeDelta);
            this.Opacity.Update(timeDelta);
        }

        public Draw(): void {
            Setups.I.Draw.RectFill(<FillRectParams> {
                position: this.Position,
                size: this.Size,
                scale: this.Transition.GetVal(),
                color: this.Color.GetTransparent(this.Opacity.GetVal()),
                origin: new Vector2(0, 0)
            });
        }
    }
}