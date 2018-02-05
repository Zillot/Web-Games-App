class Core {	
	//lastFrameTimeMs
	//maxFPS
	//delta
	//timestep
	//fps
	//frame
	//timeTemp
	//perFrameMsAwg
	
	//canvas
	//canvasCtx

	//app

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

        this.canvas = document.getElementById(Setups.CanvasName);
	
		this.canvas.width  = Setups.windowWidth;
		this.canvas.height = Setups.windowHeight; 
		this.canvas.style.width  = Setups.windowWidth + 'px';
		this.canvas.style.height = Setups.windowHeight + 'px';
		
		if (this.canvas.getContext) {
			this.canvasCtx = this.canvas.getContext('2d');
		}
		else {
			return;
		}
		
		Setups.draw.setCtx(this.canvasCtx);
	}
	
	run() {
		requestAnimationFrame(this.gameLoopRun.bind(this));
	}

	gameLoopRun(timestamp) {
		if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
			requestAnimationFrame(this.gameLoopRun.bind(this));
			return;
		}
		this.delta += timestamp - this.lastFrameTimeMs;
		this.lastFrameTimeMs = timestamp;

		while (this.delta >= this.timestep) {
			this.frame++;
			this.delta -= this.timestep;

			this.update(this.timestep / this.speedLevel);
		}
		this.draw(this.canvasCtx);

		this.timeTemp += this.timestep;

		if (this.timeTemp >= 60000) {
			this.fps = this.frame;
			this.perFrameMsAwg = this.timeTemp / this.fps;

			this.frame = 0;
			this.timeTemp = 0;
		}

		requestAnimationFrame(this.gameLoopRun.bind(this));
	}

	getMs(date) {
		return date.getMilliseconds() + (date.getSeconds() + date.getMinutes() * 60) * 1000;
	}

	update(timeDelta) {
		if (Setups.app != null) {
            Setups.app.update(timeDelta);
		}
	}
	draw(ctx) {
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (Setups.app != null) {
            Setups.app.draw(ctx);
		}
	}
}