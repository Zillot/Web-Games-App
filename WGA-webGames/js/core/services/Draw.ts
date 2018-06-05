module WGAAppModelue {
    'use strict';

    export class Draw {
        private ctx: any;

        public static PI2() { return 6.283185307179586476925286766559; }
        public static PI() { return 3.1415926535897932384626433832795; }

        public SetCtx(ctx: any): void {
            this.ctx = ctx;
        }

        //base figures
        public Line(params: LineParams): void {
            this.line(params);
        }
        public RectStroke(params: StrokeRectParams): void {
            this.rect(params, 'stroke');
        }
        public RectFill(params: FillRectParams): void {
            this.rect(new StrokeRectParams(params, 0), 'fill');
        }
        public CircleStroke(params: StrokeCircleParams): void {
            this.arc(new StrokeArcParams(new FillArcParams(params, 0, 0), params.thickness), 'stroke');
        }
        public CircleFill(params: FillCircleParams): void {
            this.arc(new StrokeArcParams(new FillArcParams(params, 0, 0), 0), 'fill');
        }
        public TextStroke(params: TextParams): void {
            this.drawText(params, "stroke");
        }
        public TextFill(params: TextParams): void {
            this.drawText(params, "fill");
        }
        public ArcStroke(params: StrokeArcParams): void {
            this.arc(params, 'stroke');
        }
        public ArcFill(params: FillArcParams): void {
            this.arc(new StrokeArcParams(params, 0), 'fill');
        }
        //extended figures
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

        //base figures privates
        private line(params: LineParams): void {
            LineParams.Normilize(params);

            this.ctx.save();
            this.ctx.strokeStyle = params.color.GetRgba();

            this.ctx.lineWidth = params.thickness;

            this.ctx.beginPath();
            this.ctx.moveTo(params.pointFrom.X, params.pointFrom.Y);
            this.ctx.lineTo(params.pointTo.X, params.pointTo.Y);
            this.ctx.stroke();

            this.ctx.restore();
        }
        private rect(params: StrokeRectParams, type: string): void {
            StrokeRectParams.Normilize(params);
            params.origin = params.origin.MUL(new Vector2(-1, -1));

            this.ctx.save();
            this.ctx.translate(params.position.X, params.position.Y);
            this.ctx.scale((<Vector2>params.scale).X, (<Vector2>params.scale).Y);
            this.ctx.rotate(params.angle);

            var x = -(params.size.X / 2) + (params.size.X / 2) * params.origin.X;
            var y = -(params.size.Y / 2) + (params.size.Y / 2) * params.origin.Y;

            if (type == 'stroke') {
                this.ctx.lineWidth = params.thickness;
                this.ctx.strokeStyle = params.color.GetRgba();
                this.ctx.strokeRect(x, y, params.size.X, params.size.Y);
            }
            else if (type == 'fill') {
                this.ctx.fillStyle = params.color.GetRgba();
                this.ctx.fillRect(x, y, params.size.X, params.size.Y);
            }

            this.ctx.restore();
        }
        private arc(params: StrokeArcParams, type: string): void {
            StrokeArcParams.Normilize(params);
            params.origin = params.origin.MUL(new Vector2(-1, -1));

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.translate(params.position.X, params.position.Y);
            this.ctx.scale((<Vector2>params.scale).X, (<Vector2>params.scale).Y);

            var x = -params.radius * params.origin.X;
            var y = -params.radius * params.origin.Y;

            this.ctx.lineWidth = params.thickness;

            if (params.endAngle < params.startAngle) {
                params.endAngle = params.endAngle + params.startAngle;
                params.startAngle = params.endAngle - params.startAngle;
                params.endAngle = params.endAngle - params.startAngle;
            }

            this.ctx.arc(x, y, params.radius, params.startAngle, params.endAngle, false);

            if (type == 'stroke') {
                this.ctx.lineWidth = params.thickness;
                this.ctx.strokeStyle = params.color.GetRgba();
                this.ctx.stroke();
            }
            else if (type == 'fill') {
                this.ctx.fillStyle = params.color.GetRgba();
                this.ctx.fill();
            }

            this.ctx.restore();
        }
        private textMeasure(params: TextParams): number {
            return this.drawText(params, "measure");
        }
        private drawText(params: TextParams, type: string): number {
            TextParams.Normilize(params);
            params.origin = params.origin.MUL(new Vector2(-1, -1));

            if (type != "measure") {
                //TODO!!
                var sizeX = this.textMeasure(params);
                var sizeY = params.fontSize;

                var x = (sizeX / 2) * params.origin.X;
                var y = -(sizeY / 2) + (sizeY / 2) * params.origin.Y;
            }

            this.ctx.save();
            this.ctx.translate(params.position.X, params.position.Y);

            this.ctx.scale((<Vector2>params.scale).X, (<Vector2>params.scale).Y);
            this.ctx.rotate(params.angle);

            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'top';

            this.ctx.font = params.fontSize + "px " + params.fontName;

            if (type == "fill") {
                this.ctx.fillStyle = params.color.GetRgba();
                this.ctx.fillText(params.str, x, y);
            }
            else if (type == "stroke") {
                this.ctx.strokeStyle = params.color.GetRgba();
                this.ctx.strokeText(params.str, x, y);
            }
            else if (type == "measure") {
                var res = this.ctx.measureText(params.str).width;
                this.ctx.restore();
                return res;
            }
            this.ctx.restore();
        }
    }

    // ===== Parameters containers stuff =====
    export class StandartParams {
        public position: Vector2;
        public origin: Vector2;
        public color: Color4;
        public angle: number;
        public scale: number | Vector2;

        constructor(params: StandartParams) {
            this.position = params.position;
            this.origin = params.origin;
            this.color = params.color;
            this.angle = params.angle;
            this.scale = params.scale;
        }

        public static Normilize(item: StandartParams): void {
            if (item.position == null) { throw "position can not be null"; }
            if (item.origin == null) { item.origin = new Vector2(0, 0); }
            if (item.color == null) { item.color = new Color4(0, 0, 0, 1); }
            if (item.angle == null) { item.angle = 0; }
            if (item.scale == null) { item.scale = new Vector2(1, 1); }

            if (typeof item.scale == "number") {
                item.scale = new Vector2(item.scale, item.scale);
            }
        }
    }

    export class FillRectParams extends StandartParams {
        public size: Vector2;

        constructor(params: StandartParams, size: Vector2) {
            super(params);
            this.size = size;
        }

        public static Normilize(item: FillRectParams): void {
            StandartParams.Normilize(item);
            if (item.size == null) { item.size = new Vector2(0, 0); }
        }
    }

    export class StrokeRectParams extends FillRectParams {
        public thickness: number;

        constructor(params: FillRectParams, thickness: number) {
            super(params, params.size);
            this.thickness = thickness;
        }

        public static Normilize(item: StrokeRectParams): void {
            FillRectParams.Normilize(item);
            if (item.thickness == null) { item.thickness = 1; }
        }
    }

    export class FillCircleParams extends StandartParams {
        public radius: number;

        constructor(params: StandartParams, radius: number) {
            super(params);
            this.radius = radius;
        }

        public static Normilize(item: FillCircleParams): void {
            StandartParams.Normilize(item);
            if (item.radius == null) { throw "radius can not be null"; }
        }
    }

    export class StrokeCircleParams extends FillCircleParams {
        public thickness: number;

        constructor(params: FillCircleParams, thickness: number) {
            super(params, params.radius);
            this.thickness = thickness;
        }

        public static Normilize(item: StrokeCircleParams): void {
            FillCircleParams.Normilize(item);
            if (item.thickness == null) { item.thickness = 1; }
        }
    }

    export class FillArcParams extends FillCircleParams {
        public radius: number;
        public startAngle: number;
        public endAngle: number;

        constructor(params: FillCircleParams, startAngle: number, endAngle: number) {
            super(params, params.radius);
            this.startAngle = startAngle;
            this.endAngle = endAngle;
        }

        public Normilize(item: FillArcParams): void {
            FillCircleParams.Normilize(item);
            if (this.startAngle == null) { this.startAngle = 0; }
            if (this.endAngle == null) { this.endAngle = Draw.PI(); }
        }
    }

    export class StrokeArcParams extends FillArcParams {
        public thickness: number;

        constructor(params: FillArcParams, thickness: number) {
            super(params, params.startAngle, params.endAngle);
            this.thickness = thickness;
        }

        public Normilize(item: StrokeArcParams): void {
            FillArcParams.Normilize(item);
            if (this.thickness == null) { this.thickness = 1; }
        }
    }

    export class TextParams extends StandartParams {
        public str: string;
        public fontName: string;
        public fontSize: number;

        constructor(params: StandartParams, fontName: string, fontSize: number) {
            super(params);
        }

        public Normilize(item: TextParams): void {
            StandartParams.Normilize(item);
            if (this.str == null) { throw "str can not be null"; }
            if (this.fontName == null) { this.fontName = "serif" }
            if (this.fontSize == null) { this.fontSize = 10 }
        }
    }

    export class LineParams {
        public pointFrom: Vector2;
        public pointTo: Vector2;
        public thickness: number;
        public color: Color4;

        public static Normilize(item: LineParams): void {
            if (item.pointFrom == null) { throw "pointFrom can not be null"; }
            if (item.pointTo == null) { throw "pointTo can not be null"; }
            if (item.thickness == null) { item.thickness = 1; }
            if (item.color == null) { item.color = new Color4(0, 0, 0, 1); }
        }
    }
}