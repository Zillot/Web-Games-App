module WGAAppModelue {
    'use strict';

    export class Castle extends Unit {
        public Color: Color4;

        constructor(position: Vector2, hp: number, speed: number) {
            super(position, Setups.I.Center.SUB(position).Normalize(), hp, speed, 10);
            this.Color = Setups.I.Utils.RandColor();
        }

        public Update(timeDelta: number): void {
            super.Update(timeDelta);
        }

        public Draw(): void {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: this.Position, size: new Vector2(100, 50) });
        }
    }
}