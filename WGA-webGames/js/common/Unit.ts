/// <reference path="../abstract/DeleteAble.ts"/>

module WGAAppModule {
    'use strict';

    export class Unit extends DeleteAble implements IUpdateable, IDrawable {
        public Position: Vector2;
        public Direction: Vector2;
        public MaxHp: number;
        public Hp: number;
        public Speed: number;
        public HitDistance: number;

        constructor(position: Vector2, direction: Vector2, hp: number, speed: number, hitDistnace: number) {
            super();

            this.Position = position;
            this.Direction = direction;
            this.MaxHp = hp;
            this.Hp = hp;
            this.Speed = speed;

            this.HitDistance = hitDistnace;
        }

        public Update(timeDelta: number): void {
            this.Position = this.Position.ADD(this.Direction.MUL(this.Speed * timeDelta));
        }
        public Draw(): void {
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: this.Position, radius: 2 });
        }
        //-------------
        public TryHit(bullet: Bullet): boolean {
            if (Vector2.Distance(this.Position, bullet.Position) < this.HitDistance + bullet.HitDistance) {
                this.Hit(bullet.Power);

                return true;
            }

            return false;
        }
        private Hit(power: number): void {
            this.Hp -= power;
            if (this.Hp < 0) {
                this.Hp = 0;
            }
        }
    }
}