/// <reference path="../../../common/Gun.ts"/>

module WGAAppModule {
    'use strict';

    export class CoreGun extends Gun {
        public Position: Vector2;
        public Direction: Vector2;
        public Power: number;
        public Bullets: Bullet[];

        public Reload: number;
        public Angle: number;
        public Width: number;

        public Color: Color4;

        constructor(rotationSpeed: number) {
            super(Setups.I.Center, rotationSpeed);

            this.Width = 1;
            this.Color = Color4.ColorFromHex('#7777FF');
        }

        protected drawGun(): void {
            var value = this.AngleControll.GetVal() + Math.PI;

            var forward = Vector2.Left.RotateTo(value - Math.PI);
            var side = Vector2.Left.RotateTo(value - Math.PI + Math.PI / 2);
            var point = this.Position.ADD(forward.MUL(54));

            //shild part
            Setups.I.Draw.ArcStroke(<StrokeArcParams>{ position: this.Position, radius: 50, startAngle: value + 0.09, endAngle: value + this.Width / 2, color: this.Color });
            Setups.I.Draw.ArcStroke(<StrokeArcParams>{ position: this.Position, radius: 50, startAngle: value - 0.09, endAngle: value - this.Width / 2, color: this.Color });

            //arrow in the center
            Setups.I.Draw.Line(<LineParams>{ pointFrom: point, pointTo: point.ADD(side.MUL(4)).ADD(forward.MUL(-4)), thickness: 1, color: this.Color });
            Setups.I.Draw.Line(<LineParams>{ pointFrom: point, pointTo: point.ADD(side.MUL(-4)).ADD(forward.MUL(-4)), thickness: 1, color: this.Color });
        }

        //-------
        public CoveredByShield(angle: number): boolean {
            var value = this.Direction.AngleAbsTo(Vector2.Left);
            return angle > value - this.Width / 2 && angle < value + this.Width / 2;
        }
    }
}