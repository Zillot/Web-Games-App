class Core {	
	//lastFrameTimeMs = 0;
	//maxFPS = 60;
	//delta = 0;
	//timestep = 1000 / 60;
	//fps = 0;
	//frame = 0;
	//timeTemp = 0;
	//perFrameMsAwg = 0;

	//mouseDown = 0;
	
	//canvas = null;
	//canvasCtx = null;

	//currentGame = null;

	constructor() {
		var those = this;
		
		this.lastFrameTimeMs = 0;
		this.maxFPS = 60;
		this.delta = 0;
		this.timestep = 1000 / 60;
		this.fps = 0;
		this.frame = 0;
		this.timeTemp = 0;
		this.perFrameMsAwg = 0;
		this.speedLevel = 1000; //1000 - normal, more = slower
		
		this.mouseDown = 0;
		this.mousePos = new Vector2();

		this.canvas = document.getElementById('DrawField');
	
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

		this.canvas.addEventListener('mousemove', function (evt) {
			those.mousePos = those.getMousePos(those.canvas, evt);
		}, false);

		document.body.onmousedown = function () {
			those.mouseDown++;
			if (those.mouseDown > 1) {
				those.mouseDown = 1;
			}
			
		}
		document.body.onmouseup = function () {
			those.mouseDown--;
			if (those.mouseDown < 0) {
				those.mouseDown = 0;
			}
		}
	}
	
	run() {
		//TEMP
		this.selectGame(Setups.allGames[0]);
		//TEMP
		
		requestAnimationFrame(this.gameLoopRun.bind(this));
	}

	getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
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

	selectGame(game) {
		this.currentGame = game;
		this.currentGame.game.init();
	}
	update(timeDelta) {
		if (this.currentGame != null) {
			this.currentGame.game.update(timeDelta);
		}
	}
	draw(ctx) {
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		if (this.currentGame != null) {
			this.currentGame.game.draw(ctx);
		}
	}
}