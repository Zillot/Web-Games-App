/// <reference path="../abstract/DeleteAble.ts"/>

module WGAAppModule {
    'use strict';

    export class Bullet extends DeleteAble {
        public Position: Vector2;
        public Direction: Vector2;
        public Power: number;
        public Speed: number;
        public HitDistance: number;

        constructor(position: Vector2, direction: Vector2, power: number, speed: number) {
            super();

            this.Position = position.GetCopy();
            this.Direction = direction.GetCopy();
            this.Power = power;
            this.Speed = speed;

            this.HitDistance = 3;
        }

        public Update(timeDelta: number): void {
            this.Position = this.Position.ADD(this.Direction.MUL(this.Speed * timeDelta));
        }
        public Draw(): void {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: this.Position, size: new Vector2(5, 5), color: Color4.Black() });
        }

        public NotOnTheGameField() {
            return this.Position.X < -100
        }
    }
}