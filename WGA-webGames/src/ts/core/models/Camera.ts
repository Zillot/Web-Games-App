import { Vector2 } from '../engine/Vector2';
import { Data } from 'src/ts/app/Data';

export class Camera {
    public Ctx: any;
    public MathPosition: Vector2;
    public Position: Vector2;
    public Zoom: number;
    public Angle: number;
    public CanvasName: string;
    public CurrentCanvasName: string;

    public Reset(): void {
        this.SetPosition(Data.I.Center);
        this.SetZoom(1);
        this.SetAngle(0);
    }

    public SetCtx(ctx: any, canvasName: string): void {
        this.Ctx = ctx;
        this.CurrentCanvasName = canvasName;
    }

    public SetCanvas(canvasName: string) {
        this.CanvasName = canvasName;
    }

    public GetPosition(): Vector2 {
        return this.Position;
    }
    public SetPosition(position: Vector2) {
        this.Position = position;
        this.UpdateCamera();
    }

    public GetZoom(): number {
        return this.Zoom;
    }
    public SetZoom(zoom: number) {
        this.Zoom = zoom;
        this.UpdateCamera();
    }

    public GetAngle(): number {
        return this.Angle;
    }
    public SetAngle(angle: number) {
        this.Angle = angle;
    }

    private UpdateCamera() {
        if (!this.Zoom || !this.Position) {
            return;
        }

        this.MathPosition = this.Position.MUL(Data.I.CameraScale).SUB(Data.I.Center.MUL(this.Zoom * Data.I.CameraScale));
    }

    public AdjustMenuViewToCamera() {
        this.Ctx.save();

        this.Ctx.translate(Data.I.FrameOffset.X, Data.I.FrameOffset.Y);
        this.Ctx.scale(Data.I.CameraScale, Data.I.CameraScale);
    }

    public AdjustViewToCamera() {
        this.Ctx.save();

        //TODO Fix camera rotation
        //this.ctx.translate(-Data.I.Center.X, -Data.I.Center.Y);
        this.Ctx.translate(this.MathPosition.X + Data.I.FrameOffset.X, this.MathPosition.Y + Data.I.FrameOffset.Y);

        this.Ctx.rotate(this.Angle);
        this.Ctx.scale(this.Zoom * Data.I.CameraScale, this.Zoom * Data.I.CameraScale);

        //var tempCamVector = Vector2.GetRotated(this.cameraPosition, -this.cameraAngle);
        //var tempCenterVector = Vector2.GetRotated(Data.I.Center, -this.cameraAngle);
        // this.ctx.translate(tempCamVector.X + tempCenterVector.X, tempCamVector.Y + tempCenterVector.Y);
    }

    public RemoveCameraInfuence() {
        this.Ctx.restore();
    }
}
