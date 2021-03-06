module WGAAppModule {
    'use strict';

    export class Tower extends Unit {
        public Size: Vector2;
        public Color1: Color4;
        public Color2: Color4;
        public Level: number;

        constructor(position: Vector2, hp: number, size: Vector2, level: number) {
            super(position, Setups.I.Center.SUB(position).Normalize(), hp, 1, 10);
            this.Size = size;
            this.Level = level;

            this.Color1 = Setups.I.Utils.RandColor();
            this.Color2 = Setups.I.Utils.RandColor();
        }

        public Update(timeDelta: number): void {
            super.Update(timeDelta);
        }

        public Draw(): void {
            Setups.I.ExDraw.DrawTower(this.Position, this.Size, this.Level, this.Color1, this.Color2, 1);
        }
    }
}