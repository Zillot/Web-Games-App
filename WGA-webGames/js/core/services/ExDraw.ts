module WGAAppModelue {
    'use strict';

    export class ExDraw {
        public DrawZombie(position: Vector2, angle: number, color1: Color4, color2: Color4, scale: Vector2 | number): void {
            if (angle == null) { angle = 0; }
            if (scale == null) { scale = new Vector2(1, 1); }

            if (typeof scale == "number") {
                scale = new Vector2(scale, scale);
            }
            var params = <FillRectParams>{
                position: position,
                size: new Vector2(30, 50),
                origin: new Vector2(0, 0),
                color: color1,
                angle: angle,
                scale: scale
            };

            Setups.I.Draw.RectFill(params);

            params.position = position.ADD((new Vector2(12 * scale.X, 0)).RotateTo(angle));
            params.size = new Vector2(20, 20);
            params.color = color2;
            Setups.I.Draw.RectFill(params);

            params.size = new Vector2(15, 8);

            params.position = position.ADD((new Vector2(16 * scale.X, -25 * scale.Y)).RotateTo(angle));
            Setups.I.Draw.RectFill(params);

            params.position = position.ADD((new Vector2(16 * scale.X, 25 * scale.Y)).RotateTo(angle));
            Setups.I.Draw.RectFill(params);
        }


        public DrawTower(position: Vector2, size: Vector2, level: number, color1: Color4, color2: Color4, scale: Vector2 | number): void {
            if (position == null) { throw "position can not be null"; }
            if (size == null) { throw "size can not be null"; }
            if (color1 == null) { throw "color1 can not be null"; }
            if (color2 == null) { throw "color2 can not be null"; }
            if (level == null) { level = 0; }
            if (scale == null) { scale = new Vector2(1, 1); }

            if (typeof scale == "number") {
                scale = new Vector2(scale, scale);
            }

            size = size.MUL(scale);

            var levelHi = size.Y * 0.1 * level;
            var baseHi = 0.75 * size.Y;
            var capHi = 0.25 * size.Y;
            var pikeHi = 0.1 * size.Y;

            Setups.I.Draw.RectFill(<FillRectParams>{
                position: position,
                size: new Vector2(0.6 * size.X, baseHi + levelHi),
                origin: new Vector2(0, 1),
                color: color1
            });

            Setups.I.Draw.RectFill(<FillRectParams>{
                position: position.SUB(new Vector2(0, baseHi + levelHi)),
                size: new Vector2(size.X, capHi),
                origin: new Vector2(0, 1),
                color: color2
            });

            Setups.I.Draw.RectFill(<FillRectParams>{
                position: position.SUB(new Vector2(0, baseHi + levelHi + capHi)),
                size: new Vector2(size.X * 0.2, pikeHi),
                origin: new Vector2(0, 1),
                color: color2
            });

            Setups.I.Draw.RectFill(<FillRectParams>{
                position: position.SUB(new Vector2(size.X * 0.5, baseHi + levelHi + capHi)),
                size: new Vector2(size.X * 0.2, pikeHi),
                origin: new Vector2(-1, 1),
                color: color2
            });


            Setups.I.Draw.RectFill(<FillRectParams>{
                position: position.SUB(new Vector2(-size.X * 0.5, baseHi + levelHi + capHi)),
                size: new Vector2(size.X * 0.2, pikeHi),
                origin: new Vector2(1, 1),
                color: color2
            });
        }
    }
}