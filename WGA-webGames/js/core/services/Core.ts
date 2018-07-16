module WGAAppModelue {
    'use strict';

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

            this.canvas = document.getElementById(Setups.I.CanvasName);

            this.canvas.width = Setups.I.WindowWidth;
            this.canvas.height = Setups.I.WindowHeight;
            this.canvas.style.width = Setups.I.WindowWidth + 'px';
            this.canvas.style.height = Setups.I.WindowHeight + 'px';

            if (this.canvas.getContext) {
                this.canvasCtx = this.canvas.getContext('2d');
            }
            else {
                return;
            }

            Setups.I.Draw.SetCtx(this.canvasCtx);
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
            if (Setups.I.App != null) {
                Setups.I.App.Update(timeDelta);
            }
        }
        public Draw(ctx: any): void {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if (Setups.I.App != null) {
                Setups.I.App.Draw();
            }
        }
    }
}