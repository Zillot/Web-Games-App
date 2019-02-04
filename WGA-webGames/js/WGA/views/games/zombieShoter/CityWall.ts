/// <reference path="../../../common/Unit.ts"/>

module WGAAppModule {
    'use strict';

    export class CityWall extends Unit {
        public Color: Color4
        public Level: number;

        private points: Vector2[];

        constructor(position: Vector2, hp: number) {
            super(position, new Vector2(1, 0), hp, 0, 30);

            this.Color = Color4.Blue;
            this.Level = 1;

            this.createWallPoints(100, 20);
        }

        private createWallPoints(step: number, width: number) {
            var y = Setups.I.WindowHeight;
            var yOffset = Setups.I.WindowHeight / 2; 

            while (y > 0) {
                this.points.push(new Vector2(0, y - yOffset));
                this.points.push(new Vector2(-width, y - (step / 2) - yOffset));

                y -= step;
            }
        }

        public Draw(): void {
            Setups.I.Draw.PolygonStroke(<StrokePolygonParams> {
                position: this.Position,
                origin: new Vector2(0, 0),
                color: this.Color,
                points: this.points,
                thickness: 1
            });
        }
    }
}