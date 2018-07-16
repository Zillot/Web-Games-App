module WGAAppModelue {
    'use strict';

    export class Gun {
        public Position: Vector2;
        public Direction: Vector2;
        public Power: number;
        public AngleControll: Value;

        public Reload: number;
        public Angle: number;

        public Bullets: Bullet[];

        constructor(position: Vector2, rotationSpeed: number) {
            this.Power = 10;
            this.Direction = new Vector2(-1, 0);
            this.Position = position;

            this.Bullets = [];

            this.Reload = 0;

            this.AngleControll = new Value(0, rotationSpeed);
        }

        public Update(timeDelta: number): void {
            var toMouseDir = Setups.I.Input.MousePos.SUB(this.Position).Normalize();
            var delta = Vector2.AngleBetween(this.Direction, toMouseDir);

            this.AngleControll.GoToDelta(delta);
            this.AngleControll.Update(timeDelta);

            this.Direction = Vector2.Left().RotateTo(this.AngleControll.GetVal());

            if (this.Reload > 0) {
                this.Reload -= timeDelta;
            }

            for (var item in this.Bullets) {
                this.Bullets[item].Update(timeDelta);
            }
        }
        public Draw(): void {
            this.drawBullets();
            this.drawGun();
        }
        //-------------
        protected drawBullets(): void {
            for (var item in this.Bullets) {
                this.Bullets[item].Draw();
            }
        }

        protected drawGun(): void {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: this.Position, size: new Vector2(50, 10), origin: new Vector2(1, 0), color: Color4.ColorFromHex('#00FF00'), angle: this.AngleControll.GetVal() });
            Setups.I.Draw.RectFill(<FillRectParams>{ position: this.Position, size: new Vector2(5, 5), origin: new Vector2(0, 0), color: Color4.ColorFromHex('#FFFF00') });
        }

        public Shoot(point: Vector2): void {
            if (this.Reload <= 0) {
                this.Reload = 0.3;
                var pos = this.Position;
                var power = 10;
                var speed = 1000 + Setups.I.Utils.RandF(-1, 1);

                this.Bullets.push(new Bullet(pos.ADD(this.Direction.MUL(40)), this.Direction, power, speed));
            }
        }
    }
}