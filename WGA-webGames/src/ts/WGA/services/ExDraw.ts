import { FillRectParams } from "../../core/models/FillRectParams";
import { Vector2 } from "../../core/engine/Vector2";
import { Color4 } from "../../core/engine/Color4";
import { ImageParams } from "../../core/models/ImageParams";
import { Draw } from 'src/ts/core/services/Draw';

export class ExDraw {
    private cache: any = [];

    public static I: ExDraw;
    public static _initialize = (() => {
        ExDraw.I = new ExDraw();
    })();

    public DrawZombie(position: Vector2, angle: number, color1: Color4, color2: Color4, scale: Vector2 | number): void {
        var key: string = "zombie_" + color1.GetRgba() + "_" + color2.GetRgba();
        var fromCache = this.cache[key];

        if (scale == null) { scale = new Vector2(1, 1); }

        if (typeof scale == "number") {
            scale = new Vector2(scale, scale);
        }

        if (fromCache == null) {
            var resPost = new Vector2(250, 325);

            var params = <FillRectParams>{
                position: resPost,
                size: new Vector2(300, 500),
                origin: new Vector2(0, 0),
                color: color1,
                scale: 1
            };

            Draw.I.StartToDrawImageResource(500, 650);
            Draw.I.RectFill(params);

            params.position = resPost.ADD((new Vector2(120, 0)));
            params.size = new Vector2(200, 200);
            params.color = color2;
            Draw.I.RectFill(params);

            params.size = new Vector2(150, 80);

            params.position = resPost.ADD((new Vector2(160, -250)));
            Draw.I.RectFill(params);

            params.position = resPost.ADD((new Vector2(160, 250)));
            Draw.I.RectFill(params);

            var img = new Image();
            img.src = Draw.I.MakeScreenShot();
            Draw.I.EndToDrawImageResource();

            this.cache[key] = img;
            fromCache = img;
        }

        var imgParams = <ImageParams>{
            position: position,
            size: new Vector2(500, 650),
            origin: new Vector2(0, 0),
            color: color1,
            angle: angle,
            scale: scale.MUL(0.1)
        };

        Draw.I.DrawImage(fromCache, imgParams);
    }

    //TODO make this as zombie
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

        //base tower
        Draw.I.RectFill(<FillRectParams>{
            position: position,
            size: new Vector2(0.6 * size.X, baseHi + levelHi),
            origin: new Vector2(0, 1),
            color: color1
        });

        //tower cap
        Draw.I.RectFill(<FillRectParams>{
            position: position.SUB(new Vector2(0, baseHi + levelHi)),
            size: new Vector2(size.X, capHi),
            origin: new Vector2(0, 1),
            color: color2
        });

        //tower spikes
        var start = position.SUB(new Vector2(size.X * 0.5, baseHi + levelHi + capHi));
        for (var i = 0; i < 3; i++) {
            Draw.I.RectFill(<FillRectParams>{
                position: start.ADD(new Vector2(size.X * 0.4 * i, 0)),
                size: new Vector2(size.X * 0.2, pikeHi),
                origin: new Vector2(-1, 1),
                color: color2
            });
        }
    }
}
