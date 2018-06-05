module WGAAppModelue {
    'use strict';

    export class CoreGun extends Gun {
        public Position: Vector2;
        public Direction: Vector2;
        public Power: number;
        public Bullets: Bullet[];

        public Reload: number;
        public Angle: number;
        public Width: number;

        constructor(rotationSpeed: number) {
            super(Setups.I.Center, rotationSpeed);

            this.Width = 1;
        }

        protected drawGun(ctx: any): void {
            var value = this.AngleControll.GetVal() + Math.PI;
            var color1 = Color4.ColorFromHex('#7777FF');
            var color2 = Color4.ColorFromHex('#7777FF');

            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: this.Position, radius: 30, color: color1.GetTransparent(0.2) });
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: this.Position, radius: 10, color: color1.GetTransparent(0.5) });
            Setups.I.Draw.CircleFill(<FillCircleParams>{ position: this.Position, radius: 6, color: color1.GetTransparent(0.5) });

            var forward = Vector2.Left().RotateTo(value - Math.PI);
            var side = Vector2.Left().RotateTo(value - Math.PI + Math.PI / 2);
            var point = this.Position.ADD(forward.MUL(54));

            Setups.I.Draw.ArcFill(<FillArcParams>{ position: this.Position, radius: 50, startAngle: value + 0.09, endAngle: value + this.Width / 2, color: color2 });
            Setups.I.Draw.ArcFill(<FillArcParams>{ position: this.Position, radius: 50, startAngle: value - 0.09, endAngle: value - this.Width / 2, color: color2 });

            Setups.I.Draw.Line(<LineParams>{ pointFrom: point, pointTo: point.ADD(side.MUL(4)).ADD(forward.MUL(-4)), thickness: 1, color: color2 });
            Setups.I.Draw.Line(<LineParams>{ pointFrom: point, pointTo: point.ADD(side.MUL(-4)).ADD(forward.MUL(-4)), thickness: 1, color: color2 });
        }

        //-------
        public CoveredByShield(angle: number): boolean {
            var value = Vector2.Left().AngleTo(this.Direction);
            return angle > value - this.Width / 2 && angle < value + this.Width / 2;
        }
    }
}