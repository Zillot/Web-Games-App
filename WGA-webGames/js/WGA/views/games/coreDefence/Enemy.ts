/// <reference path="../../../common/Unit.ts"/>

module WGAAppModule {
    'use strict';

    export class Enemy extends Unit {
        public Color: Color4;
        public Power: number;
        public Angle: number;

        public MinDistance: number;
        public MaxDistance: number;
        public DistanceToDash: number;
        public Radius: number;

        constructor(position: Vector2, hp: number, speed: number) {
            super(position, Setups.I.Center.SUB(position).Normalize(), hp, speed, 10);

            this.Color = Setups.I.Utils.RandColor();
            this.Power = 20;
            this.Angle = Vector2.AngleAbsBetween(Vector2.Right(), this.Direction);

            this.MinDistance = 100;
            this.MaxDistance = 600;
            this.DistanceToDash = 110;
            this.Radius = 3;
        }

        public Update(timeDelta: number): void {
            super.Update(timeDelta);

            var toCenter = Vector2.Distance(this.Position, Setups.I.Center);
            var toProcess = toCenter - this.MinDistance;

            if (toProcess > this.MaxDistance) {
                toProcess = this.MaxDistance;
            }

            this.CalculateSpeed(toProcess, toCenter);
        }

        public CalculateSpeed(toProcess: number, toCenter: number) {
            this.Speed = ((toProcess / this.MaxDistance) * this.MaxDistance);

            if (this.Speed < 10) {
                this.Speed = 10;
            }

            if (toCenter < this.DistanceToDash) {
                this.Speed = 1500;
            }
        }

        public Draw(): void {
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: this.Position, radius: this.Radius * 2, color: this.Color });
        }
    }
}