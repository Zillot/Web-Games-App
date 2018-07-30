module WGAAppModule {
    'use strict';

    export class Draw {
        private ctx: any;
        private cameraMathPosition: Vector2;
        private cameraPosition: Vector2;
        private cameraZoom: number;
        private cameraAngle: number;

        public static PI2() { return 6.283185307179586476925286766559; }
        public static PI() { return 3.1415926535897932384626433832795; }

        constructor() {
            this.ResetCamera();
        }

        public SetCtx(ctx: any): void {
            this.ctx = ctx;
        }

        //camera controll
        public ResetCamera(): void {
            this.SetCameraPosition(Setups.I.Center);
            this.SetCameraZoom(1);
            this.SetCameraAngle(0);
        }

        public GetCameraPosition(): Vector2 {
            return this.cameraMathPosition;
        }
        public SetCameraPosition(position: Vector2) {
            this.cameraMathPosition = position;
            this.UpdateCamera();
        }

        public GetCameraZoom(): number {
            return this.cameraZoom;
        }
        public SetCameraZoom(zoom: number) {
            this.cameraZoom = zoom;
            this.UpdateCamera();
        }

        public GetCameraAngle(): number {
            return this.cameraAngle;
        }
        public SetCameraAngle(angle: number) {
            this.cameraAngle = angle;
        }

        private UpdateCamera() {
            if (!this.cameraZoom || !this.cameraMathPosition) {
                return;
            }

            this.cameraPosition = this.cameraMathPosition.SUB(Setups.I.Center.MUL(this.cameraZoom));
        }

        public adjustViewToCamera() {
            this.ctx.save();

            this.ctx.translate(-Setups.I.Center.X, -Setups.I.Center.Y);

            this.ctx.rotate(this.cameraAngle);
            this.ctx.scale(this.cameraZoom, this.cameraZoom);

            var tempCamVector = Vector2.GetRotated(this.cameraPosition, -this.cameraAngle);
            var tempCenterVector = Vector2.GetRotated(Setups.I.Center, -this.cameraAngle);
            this.ctx.translate(tempCamVector.X + tempCenterVector.X, tempCamVector.Y + tempCenterVector.Y);
        }

        public removeCameraInfuence() {
            this.ctx.restore();
        }

        //base figures
        public Line(params: LineParams): void {
            this.line(params);
        }
        public TriangleStroke(params: StrokeTriangleParams): void {
            this.triangle(params, 'stroke');
        }
        public TriangleFill(params: FillTriangleParams): void {
            this.triangle(new StrokeTriangleParams(params, 0), 'fill');
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

        private triangle(params: StrokeTriangleParams, type: string): void {
            StrokeRectParams.Normilize(params);
            params.origin = params.origin.MUL(new Vector2(-1, -1));

            var startPoint = params.position.X + params.size.X * 0.5 * params.origin.X;

            this.ctx.save();

            this.ctx.translate(params.position.X, params.position.Y);
            this.ctx.scale((<Vector2>params.scale).X, (<Vector2>params.scale).Y);
            this.ctx.rotate(params.angle);

            var x = -(params.size.X / 2) + (params.size.X / 2) * params.origin.X;
            var y = (params.size.Y / 2) + (params.size.Y / 2) * params.origin.Y;

            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + params.size.X, y);
            this.ctx.lineTo(x + params.size.X / 2, y - params.size.Y);
            this.ctx.lineTo(x, y);

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
}