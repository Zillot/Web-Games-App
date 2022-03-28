import { Injectable } from '@angular/core';
import { Data } from "../../app/Data";
import { Vector2 } from '../engine/Vector2';
import { WGAApp } from 'src/ts/app/WGAApp';
import { Timeout } from './Timeout';

@Injectable()
export class Core {
    public static I: Core;
    public static _initialize = (() => {
        Core.I = new Core(null);
    })();

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

    public constructor(
        private _wgaApp: WGAApp) {
    }

    public Initialize(): void{
        this.lastFrameTimeMs = 0;
        this.maxFPS = 120;
        this.delta = 0;
        this.timestep = 1000 / 120;
        this.fps = 0;
        this.frame = 0;
        this.timeTemp = 0;
        this.perFrameMsAwg = 0;
        this.speedLevel = 1000; //1000 - normal, more = slower

        var t = Data.I.Camera.CanvasName;
        this.canvas = document.getElementById(Data.I.Camera.CanvasName);

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

        Data.I.Camera.SetCtx(this.canvasCtx, Data.I.Camera.CanvasName);
    }

    public WindowScalingProccess() {
        this.RecalculateWindowsSize();
        this.UpdateCanvasPosition();
    }

    public RecalculateWindowsSize() {
        Data.I.RealWindowSize = new Vector2(window.innerWidth, window.innerHeight);

        var sw = Data.I.RealWindowSize.X / Data.I.WindowSize.X;
        var sh = Data.I.RealWindowSize.Y / Data.I.WindowSize.Y;

        var bsw = Data.I.WindowSize.X / Data.I.RealWindowSize.X;
        var bsh = Data.I.WindowSize.Y / Data.I.RealWindowSize.Y;

        Data.I.FrameScale = Math.min(sw, sh);
        Data.I.BackFrameScale = Math.max(bsw, bsh);

        Data.I.CanvasSize = new Vector2(
            Data.I.WindowSize.X * Data.I.FrameScale,
            Data.I.WindowSize.Y * Data.I.FrameScale);

        Data.I.FrameRealOffset = new Vector2(
            (Data.I.RealWindowSize.X - (Data.I.CanvasSize.X)) / 2,
            (Data.I.RealWindowSize.Y - (Data.I.CanvasSize.Y)) / 2);

        Data.I.FrameOffset = new Vector2(0, 0);

        Data.I.Center = new Vector2(Data.I.WindowSize.X, Data.I.WindowSize.Y).DIV(2);
        Data.I.RealCenter = new Vector2(Data.I.RealWindowSize.X, Data.I.RealWindowSize.Y).DIV(2);
    }

    public UpdateCanvasPosition(): void {
        if (!this.canvas) {
            return;
        }

        this.canvas.width = Data.I.WindowSize.X;
        this.canvas.height = Data.I.WindowSize.Y;

        this.canvas.style.width = Data.I.CanvasSize.X + 'px';
        this.canvas.style.height = Data.I.CanvasSize.Y + 'px';

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
        if (this._wgaApp != null) {
            this._wgaApp.Update(timeDelta);
            Timeout.Update(timeDelta)
        }
    }
    public Draw(ctx: any): void {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this._wgaApp != null) {
            this._wgaApp.Draw();
        }
    }
}
