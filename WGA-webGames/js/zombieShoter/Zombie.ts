module WGAAppModelue {
    'use strict';

    export class Zombie extends Unit {
        public position: Vector2;
        public Direction: Vector2;
        public MaxHp: number
        public Hp: number;
        public Speed: number
        public Angle: number
        public Color: Color4
        public Power: number;

        constructor(position: Vector2, hp: number, speed: number) {
            super(position, new Vector2(1, 0), hp, speed, 30);

            this.Color = Setups.I.Utils.RandColor();
            this.Power = 20;
            this.Angle = Vector2.AngleAbsBetween(Vector2.Right(), this.Direction);
        }

        public Draw(ctx: any): void {
            var scale = 0.8 + (this.Hp / this.MaxHp) * 0.2;
            Setups.I.Draw.DrawZombie(this.position, this.Angle, this.Color, this.Color.GetInvertColor(), scale);
        }
    }
}