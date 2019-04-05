declare var $: any;

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

        public SetCtx(ctx: any, canvasName: string): void {
            this.ctx = ctx;
            this.currentCanvasName = canvasName;
        }

        //camera controll
        public ResetCamera(): void {
            this.SetCameraPosition(Setups.I.Center);
            this.SetCameraZoom(1);
            this.SetCameraAngle(0);
        }

        public GetCameraPosition(): Vector2 {
            return this.cameraPosition;
        }
        public SetCameraPosition(position: Vector2) {
            this.cameraPosition = position;
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
            if (!this.cameraZoom || !this.cameraPosition) {
                return;
            }

            this.cameraMathPosition = this.cameraPosition.MUL(Setups.I.FrameScale).SUB(Setups.I.Center.MUL(this.cameraZoom * Setups.I.FrameScale));
        }

        public adjustMenuViewToCamera() {
            this.ctx.save();

            this.ctx.translate(Setups.I.FrameRealOffset.X, Setups.I.FrameRealOffset.Y);
            this.ctx.scale(Setups.I.FrameScale, Setups.I.FrameScale);
        }

        public adjustViewToCamera() {
            this.ctx.save();

            //TODO Fix camera rotation
            //this.ctx.translate(-Setups.I.Center.X, -Setups.I.Center.Y);
            this.ctx.translate(this.cameraMathPosition.X + Setups.I.FrameRealOffset.X, this.cameraMathPosition.Y + Setups.I.FrameRealOffset.Y);

            this.ctx.rotate(this.cameraAngle);
            this.ctx.scale(this.cameraZoom * Setups.I.FrameScale, this.cameraZoom * Setups.I.FrameScale);

            //var tempCamVector = Vector2.GetRotated(this.cameraPosition, -this.cameraAngle);
            //var tempCenterVector = Vector2.GetRotated(Setups.I.Center, -this.cameraAngle);
           // this.ctx.translate(tempCamVector.X + tempCenterVector.X, tempCamVector.Y + tempCenterVector.Y);
        }

        public removeCameraInfuence() {
            this.ctx.restore();
        }

        //base figures
        public Line(params: LineParams): void {
            this.line(params);
        }
        public PolygonStroke(params: StrokePolygonParams): void {
            this.polygon(params, 'stroke');
        }
        public PolygonFill(params: FillPolygonParams): void {
            this.polygon(new StrokePolygonParams(params, 0), 'fill');
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
            this.arc(new StrokeArcParams(new FillArcParams(params, 0, null), params.thickness), 'stroke');
        }
        public CircleFill(params: FillCircleParams): void {
            this.arc(new StrokeArcParams(new FillArcParams(params, 0, null), 0), 'fill');
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

        private polygon(params: StrokePolygonParams, type: string): void {
            StrokePolygonParams.Normilize(params);
            params.origin = params.origin.MUL(new Vector2(0, 0));

            var leftTop = params.points[0].GetCopy();
            var rightBottom = params.points[0].GetCopy();

            for (var i = 0; i < params.points.length; i++) {
                var point = params.points[i];

                if (leftTop.X < point.X) {
                    leftTop.X = point.X;
                }

                if (leftTop.Y < point.Y) {
                    leftTop.Y = point.Y;
                }

                if (rightBottom.X > point.X) {
                    rightBottom.X = point.X;
                }

                if (rightBottom.Y > point.Y) {
                    rightBottom.Y = point.Y;
                }
            }

            var size = rightBottom.SUB(leftTop);
            size = new Vector2(Math.abs(size.X), Math.abs(size.Y));

            var startPoint = params.position.X + size.X * 0.5 * params.origin.X;

            this.ctx.save();

            this.ctx.translate(params.position.X, params.position.Y);
            this.ctx.scale((<Vector2>params.scale).X, (<Vector2>params.scale).Y);
            this.ctx.rotate(params.angle);

            var x = 0;
            var y = 0;

            this.ctx.beginPath();
            this.ctx.moveTo(x, y);

            for (var i = 0; i < params.points.length; i++) {
                var point = params.points[i];
                if (i == 0) {
                    this.ctx.moveTo(x + point.X, y + point.Y);
                }
                else {
                    this.ctx.lineTo(x + point.X, y + point.Y);
                }
            }

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

            /*if (params.endAngle < params.startAngle) {
                params.endAngle = params.endAngle + params.startAngle;
                params.startAngle = params.endAngle - params.startAngle;
                params.endAngle = params.endAngle - params.startAngle;
            }*/

            this.ctx.arc(x, y, params.radius, params.startAngle, params.endAngle, params.startAngle > params.endAngle);

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
            if (type != "measure") {
                params.origin = params.origin.MUL(new Vector2(-1, -1));
            }

            var x = 0;
            var y = 0;

            if (type != "measure") {
                var sizeX = this.textMeasure(params);
                var sizeY = params.fontSize;

                x = (sizeX / 2) * params.origin.X;
                y = -(sizeY / 2) + (sizeY / 2) * params.origin.Y;
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

        public DrawImage(img: any, params: ImageParams) {
            StandartParams.Normilize(params);

            this.ctx.save();
            this.ctx.translate(params.position.X, params.position.Y);

            this.ctx.scale((<Vector2>params.scale).X, (<Vector2>params.scale).Y);
            this.ctx.rotate(params.angle);

            var x = -(params.size.X / 2) + (params.size.X) * params.origin.X;
            var y = -(params.size.Y / 2) + (params.size.Y / 2) * params.origin.Y;

            this.ctx.drawImage(img, x, y, params.size.X, params.size.Y);

            this.ctx.restore();
        }

        public currentCanvasName: string;
        public savedCtx: any;
        public StartToDrawImageResource(width: number, height: number) {
            this.savedCtx = this.ctx;

            this.currentCanvasName = Setups.I.WorkingDrawCanvasName;
            var canvas: any = document.getElementById(Setups.I.WorkingDrawCanvasName);
            
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            if (canvas.getContext) {
                this.ctx = canvas.getContext('2d');
            }
            else {
                this.EndToDrawImageResource();
                return;
            }
        }
        public EndToDrawImageResource() {
            this.currentCanvasName = Setups.I.FramesCanvasName;
            this.ctx = this.savedCtx;
        }

        public MakeScreenShot() {
            return (<any>document.getElementById(Setups.I.WorkingDrawCanvasName)).toDataURL();
        }
    }
}