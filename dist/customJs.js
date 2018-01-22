class Color4 {
	//R;
	//G;
	//B;
	//A;
	
	constructor(R, G, B, A) {
		this.R = R;
		this.G = G;
		this.B = B;
		this.A = A;
	}
	
	getInvertColor() {
		return new Color4(255 - this.R, 255 - this.G, 255 - this.B, this.A);
	}
	
	getRgba() {
		return 'rgba(' + this.R + ', ' + this.G + ', ' + this.B + ', ' + this.A + ')';
	}
}
class Core {	
	//lastFrameTimeMs = 0;
	//maxFPS = 60;
	//delta = 0;
	//timestep = 1000 / 60;
	//fps = 0;
	//frame = 0;
	//timeTemp = 0;
	//perFrameMsAwg = 0;

	// mouseDown = 0;
	
	//var canvas = null;
	//var canvasCtx = null;

	//var currentGame = null;
	//var allGames = [];

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
	
		this.canvas.width  = Setups.SETUPS_windowWidth;
		this.canvas.height = Setups.SETUPS_windowHeight; 
		this.canvas.style.width  = Setups.SETUPS_windowWidth + 'px';
		this.canvas.style.height = Setups.SETUPS_windowHeight + 'px';
		
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
class Draw {
	setCtx(ctx) {
		this.ctx = ctx;
	}
	
	rect(pos, size, origin, color, angle, scale) {
		if (pos == null) { pos = new Vector2(0, 0); }
		if (size == null) { size = new Vector2(0, 0); }
		if (origin == null) { origin = new Vector2(0.5, 0.5); }
		if (color == null) { color = new Color4(0, 0, 0, 1); }
		if (angle == null) { angle = 0; }
		if (scale == null) { scale = new Vector2(1, 1); }
		
		if (typeof origin == "number") {
			origin = new Vector2(origin, origin);
		}
		if (typeof scale == "number") {
			scale = new Vector2(scale, scale);
		}
		
		this.ctx.save();
		this.ctx.translate(pos.X - size.X / 2 + size.X * origin.X, pos.Y - size.Y / 2 + size.Y * origin.Y);
		this.ctx.scale(scale.X, scale.Y);
		this.ctx.rotate(angle);
		
        this.ctx.fillStyle = color.getRgba();  
		
        this.ctx.fillRect(-size.X * origin.X, -size.Y * origin.Y, size.X, size.Y);
		this.ctx.restore();
	}
	
	line(pos1, pos2, thickness, color) {
		if (color == null) { color = "#000000FF"; }
		if (thickness == null) { opacity = 1; }
		
		if (typeof color == "Color4") {
			color = color.getHex();
		}
		
		this.ctx.save();
		
		//
		
		this.ctx.restore();
	}
}
class Setups {
	constructor() {		
		Setups.SETUPS_windowWidth = window.innerWidth;
		Setups.SETUPS_windowHeight = window.innerHeight;
	
		Setups.utils = new Utils();
		Setups.draw = new Draw();
		Setups.core = new Core();
			
		Setups.allGames = [{
			name: "zombieShoter",
			game: new ZombieShoter()
		}];
	}
}
class Utils {
	randI(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	randF(min, max) {
		return Math.random() * (max - min) + min;
	}
	randColor() {
		return new Color4(this.randI(0, 255), this.randI(0, 255), this.randI(0, 255), 1);
	}
}
class Vector2 {
    //X;
    //Y;

    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
    set(x, y) {
        this.X = x;
        this.Y = y;
		return this;
    }
    setVector(v) {
        this.X = v.X;
        this.Y = v.Y;
		return this;
    }

    ADDE(v2) {
        var v = Vector2.ADD(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
    SUBE(v2) {
        var v = Vector2.SUB(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
    MULE(v2) {
        var v = Vector2.MUL(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
    DIVE(v2) {
        var v = Vector2.DIV(this, v2);
        this.set(v.X, v.Y);
		return this;
    }

    ADD(v2) {
        return Vector2.ADD(this, v2);
    }
    SUB(v2) {
        return Vector2.SUB(this, v2);
    }
    MUL(v2) {
        return Vector2.MUL(this, v2);
    }
    DIV(v2) {
        return Vector2.DIV(this, v2);
    }
    normalize() {
        var v = Vector2.normalize(this);
        this.set(v.X, v.Y);
		return this;
    }
    length() {
        return Vector2.length(this);
    }

    static ADD(v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X + v2, v1.Y + v2);
        }
		return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
    }
    static SUB(v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X - v2, v1.Y - v2);
        }
		return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
    }
    static MUL(v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X * v2, v1.Y * v2);
        }
		return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
    }
    static DIV(v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X / v2, v1.Y / v2);
        }
		return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
    }
    static normalize(v) {
        var len = v.length();
        return new Vector2(v.X / len, v.Y / len);
    }
    static distance(v1, v2) {
        var v = new Vector2(v1.X - v2.X, v1.Y - v2.Y);
        return v.length();
    }
    static length(v) {
        return Math.abs(Math.sqrt(v.X * v.X + v.Y * v.Y));
    }
	static getRotated(v1, angle) {
		var v2 = new Vector2(v1.X, v1.Y);
		
		v2.X = Math.cos(angle) * v2.X - Math.sin(angle) * v2.Y;
		v2.Y = Math.sin(angle) * v2.X + Math.cos(angle) * v2.Y;
		
		return v2;
	}
}
window.onload = function () {
	var setups = new Setups();
	Setups.core.run();
};
//=============================================================================================================
//====== GAME START ======================================================================= ZOMBIE SMASH ======
//=============================================================================================================
//============ SETUPS START

//============ SETUPS END
class ZombieShoter {
    //zombies;
    //guns;

    //maxZombies;
    //zombieSpawnPause;

    //scoreGoal;
    //scoreCurrent;
    //level;

    constructor() {
        this.zombies = [];
        this.guns = [];
    }

    init() {
        this.level = 1;
        this.maxZombies = 4;
        this.scoreGoal = 20;
        this.scoreCurrent = 0;
        this.zombieSpawnPause = 0;

        this.guns.push(new Gun(new Vector2(Setups.SETUPS_windowWidth - 100, Setups.SETUPS_windowHeight / 2)));
    }
    update(timeDelta) {
        if (Setups.core.mouseDown) {
            for (var item in this.guns) {
                this.guns[item].shoot(Setups.core.mousePos);
            }
        }

        if (this.zombies.length < this.maxZombies && this.zombieSpawnPause <= 0) {
            this.spawnZombie();
            this.zombieSpawnPause = 4 / this.level;
        }

        if (this.zombieSpawnPause > 0) {
            this.zombieSpawnPause -= timeDelta;
        }

        for (var item in this.zombies) {
            this.zombies[item].update(timeDelta);
        }
        for (var item in this.guns) {
            this.guns[item].update(timeDelta);
        }

        for (var gunKey in this.guns) {
			var gun = this.guns[gunKey];
			for (var bulletKey = 0; bulletKey < gun.bullets.length; bulletKey++) {
				var bullet = gun.bullets[bulletKey];
				
				if (bullet.position.X < -100) {
					gun.bullets.splice(bulletKey--, 1);
					continue;
				}

				for (var zombieKey in this.zombies) {
					var zombie = this.zombies[zombieKey];
					var hit = zombie.tryHit(bullet);
					
					if (hit) {
						gun.bullets.splice(bulletKey--, 1);
					}

					if (zombie.hp <= 0 || zombie.position.X > Setups.SETUPS_windowWidth + 100) {
						this.zombies.splice(this.zombies.indexOf(zombie), 1);
						continue;
						//TODO hit player
					}
					
					if (hit) {
						break;
					}
				}
			}
        }

        if (this.scoreCurrent >= this.scoreGoal) {
            this.scoreGoal = this.scoreGoal * 3;
            this.maxZombies += (2 * this.level);
            this.level++;
        }
    }
    draw(ctx) {
        for (var item in this.zombies) {
            this.zombies[item].draw(ctx);
        }
        for (var item in this.guns) {
            this.guns[item].draw(ctx);
        }
    }
    //-------------
    spawnZombie() {
        this.zombies.push(new Zombie(new Vector2(-40, Setups.utils.randI(0, Setups.SETUPS_windowHeight)), 200 * this.level, 100 * (this.level / 2)));
    }
}

class Zombie {
    //position;
    //direction;
    //power;
    //speed;
    //hp;
    //color;

    constructor(_position, _hp, _speed) {
        this.position = _position;
        this.direction = new Vector2(1, 0);
        this.maxHp = _hp;
        this.hp = _hp;
        this.color = Setups.utils.randColor();
        this.speed = _speed;
    }

    update(timeDelta) {
        this.position = this.position.ADD(this.direction.MUL(this.speed * timeDelta));
    }
    draw(ctx) {
		var scale = 0.8 + (this.hp / this.maxHp) * 0.2;
		
		//body
		this.drawBlock(new Vector2(30, 50), new Vector2(0, 0), this.color, scale);
		
		//head
		this.drawBlock(new Vector2(20, 20), new Vector2(12 * scale, 0), this.color.getInvertColor(), scale);
		//arms
		this.drawBlock(new Vector2(15, 8), new Vector2(16 * scale, -25 * scale), this.color.getInvertColor(), scale);
		this.drawBlock(new Vector2(15, 8), new Vector2(16 * scale, 25 * scale), this.color.getInvertColor(), scale);
    }
    //-------------
	drawBlock(size, offset, color, scale) {
		Setups.draw.rect(this.position.ADD(offset), size, new Vector2(0.5, 0.5), color, 0, scale);
	}
	getVal(val, coef) {
		return val * 0.7 + val * 0.3 * coef;
	}
    tryHit(bullet) {
        if (Vector2.distance(this.position, bullet.position) < bullet.hitDistance) {
            this.hit(bullet.power);
			
			return true;
        }
		
		return false;
    }
    hit(power) {
        this.hp -= power;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }
}
class Gun {
    //position;
    //direction;
    //power;
    //bullets;

    //reload;

    constructor(_position) {
        this.power = 10;
        this.direction = new Vector2(-1, 0);
        this.position = _position;

        this.bullets = [];

        this.reload = 0;
    }

    update(timeDelta) {
        if (this.reload > 0) {
            this.reload -= timeDelta;
        }

        for (var item in this.bullets) {
            this.bullets[item].update(timeDelta);
        }
    }
    draw(ctx) {
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(this.position.X, this.position.Y - 5, 50, 10);

        for (var item in this.bullets) {
            this.bullets[item].draw(ctx);
        }
    }
    //-------------
    shoot(point) {
        if (this.reload <= 0) {
            this.reload = 0.3;
            var pos = this.position;
            var dir = point.SUB(this.position).normalize();
			var power = 10;
            var speed = 1000 + Setups.utils.randF(-1, 1);

            this.bullets.push(new Bullet(pos, dir, power, speed));
        }
    }
}
class Bullet {
    //position;
    //direction;
    //power;
    //speed;

    constructor(_position, _direction, _power, _speed) {
        this.position = _position;
        this.direction = _direction;
        this.power = _power;
        this.speed = _speed;
		
		this.hitDistance = 30;
    }

    update(timeDelta) {
        this.position = this.position.ADD(this.direction.MUL(this.speed * timeDelta));
    }
    draw(ctx) {
		ctx.save();
		ctx.translate(this.position.X + 5, this.position.Y + 5);
		ctx.rotate(0.5);
        ctx.fillStyle = '#FF0000';  
		ctx.translate(-this.position.X - 5, -this.position.Y - 5);
        ctx.fillRect(this.position.X, this.position.Y, 10, 10);
		ctx.restore();
    }
}
//=============================================================================================================
//====== GAME END ========================================================================= ZOMBIE SMASH ======
//=============================================================================================================