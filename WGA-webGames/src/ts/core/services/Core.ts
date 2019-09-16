import { Data } from "../../app/Setups";
import { Vector2 } from '../engine/Vector2';

export class Core {
    private lastFrameTimeMs: number;
    private maxFPS: number;
    private delta: number;
    private timestep: number;
    private fps: number;
    private frame: number;
    private timeTemp: number;
    private perFrameMsAwg: number;
    private speedLevel: number;

    private canvas: any;
    private canvasCtx: any;

    constructor() {
        this.lastFrameTimeMs = 0;
        this.maxFPS = 60;
        this.delta = 0;
        this.timestep = 1000 / 60;
        this.fps = 0;
        this.frame = 0;
        this.timeTemp = 0;
        this.perFrameMsAwg = 0;
        this.speedLevel = 1000; //1000 - normal, more = slower

        this.canvas = document.getElementById(Data.I.FramesCanvasName);

        this.WindowScalingProccess();
        window.onresize = (event) => {
            this.WindowScalingProccess();
        };

        if (this.canvas.getContext) {
            this.canvasCtx = this.canvas.getContext('2d');
        }
        else {
            return;
        }

        Data.I.Draw.SetCtx(this.canvasCtx, Data.I.FramesCanvasName);
    }

    public WindowScalingProccess() {
        this.RecalculateWindowsSize();
        this.UpdateCanvasPosition();
    }

    public RecalculateWindowsSize() {
        Data.I.RealWindowWidth = window.innerWidth;
        Data.I.RealWindowHeight = window.innerHeight;

        var sw = Data.I.RealWindowWidth / Data.I.WindowWidth;
        var sh = Data.I.RealWindowHeight / Data.I.WindowHeight;

        var bsw = Data.I.WindowWidth / Data.I.RealWindowWidth;
        var bsh = Data.I.WindowHeight / Data.I.RealWindowHeight;

        Data.I.FrameScale = Math.min(sw, sh);
        Data.I.BackFrameScale = Math.max(bsw, bsh);

        Data.I.CanvasWidth = Data.I.WindowWidth * Data.I.FrameScale;
        Data.I.CanvasHeight = Data.I.WindowHeight * Data.I.FrameScale;

        var tx = (Data.I.RealWindowWidth - (Data.I.CanvasWidth)) / 2;
        var ty = (Data.I.RealWindowHeight - (Data.I.CanvasHeight)) / 2;

        Data.I.FrameRealOffset = new Vector2(tx, ty);
        Data.I.FrameOffset = new Vector2(0, 0);

        Data.I.Center = new Vector2(Data.I.WindowWidth, Data.I.WindowHeight).DIV(2);
        Data.I.RealCenter = new Vector2(Data.I.RealWindowWidth, Data.I.RealWindowHeight).DIV(2);
    }

    public UpdateCanvasPosition(): void {
        if (!this.canvas) {
            return;
        }

        this.canvas.width = Data.I.WindowWidth;
        this.canvas.height = Data.I.WindowHeight;
        this.canvas.style.width = Data.I.CanvasWidth + 'px';
        this.canvas.style.height = Data.I.CanvasHeight + 'px';

        this.canvas.style.position = "absolute";
        this.canvas.style.left = Data.I.FrameRealOffset.X + "px";
        this.canvas.style.top = Data.I.FrameRealOffset.Y + "px";
    }

    public Run(): void {
        requestAnimationFrame(this.GameLoopRun.bind(this));
    }

    public GameLoopRun(timestamp: number): void {
        if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
            requestAnimationFrame(this.GameLoopRun.bind(this));
            return;
        }
        this.delta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        while (this.delta >= this.timestep) {
            this.frame++;
            this.delta -= this.timestep;

            this.Update(this.timestep / this.speedLevel);
        }
        this.Draw(this.canvasCtx);

        this.timeTemp += this.timestep;

        if (this.timeTemp >= 60000) {
            this.fps = this.frame;
            this.perFrameMsAwg = this.timeTemp / this.fps;

            this.frame = 0;
            this.timeTemp = 0;
        }

        requestAnimationFrame(this.GameLoopRun.bind(this));
    }

    public GetMs(date: Date): number {
        return date.getMilliseconds() + (date.getSeconds() + date.getMinutes() * 60) * 1000;
    }

    public Update(timeDelta: number): void {
        if (Data.I.App != null) {
            Data.I.App.Update(timeDelta);
        }
    }
    public Draw(ctx: any): void {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (Data.I.App != null) {
            Data.I.App.Draw();
        }
    }
}
