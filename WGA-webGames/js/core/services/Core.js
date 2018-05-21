var Core = /** @class */ (function () {
    function Core() {
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
    Core.prototype.Run = function () {
        requestAnimationFrame(this.GameLoopRun.bind(this));
    };
    Core.prototype.GameLoopRun = function (timestamp) {
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
    };
    Core.prototype.GetMs = function (date) {
        return date.getMilliseconds() + (date.getSeconds() + date.getMinutes() * 60) * 1000;
    };
    Core.prototype.Update = function (timeDelta) {
        if (Setups.I.App != null) {
            Setups.I.App.Update(timeDelta);
        }
    };
    Core.prototype.Draw = function (ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (Setups.I.App != null) {
            Setups.I.App.Draw(ctx);
        }
    };
    return Core;
}());
//# sourceMappingURL=Core.js.map