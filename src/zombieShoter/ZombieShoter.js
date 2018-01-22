class ZombieShoter {
    //zombies;
    //guns;

    //maxZombies;
    //zombieSpawnPause;

    //scoreGoal;
    //scoreCurrent;
    //level;
	
	//score;
	//health;
	
    constructor() { }
	
	init() {
		this.score = 0;		
		this.health = 100;
		
        this.zombies = [];
        this.guns = [];
		
        this.level = 1;
        this.maxZombies = 4;
        this.scoreGoal = 20;
        this.scoreCurrent = 0;
        this.zombieSpawnPause = 0;
		
        this.guns.push(new Gun(new Vector2(Setups.windowWidth - 50, Setups.windowHeight / 2)));
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

				for (var zombieKey = 0; zombieKey < this.zombies.length; zombieKey++) {
					var zombie = this.zombies[zombieKey];
					var hit = zombie.tryHit(bullet);
					
					if (hit) {
						gun.bullets.splice(bulletKey--, 1);
					}

					if (zombie.hp <= 0 || zombie.position.X > Setups.windowWidth + 100) {
						this.zombies.splice(zombieKey--, 1);
						this.hitPlayer(zombie.power);
						continue;
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
		Setups.draw.textFill("score: " + this.score, new Vector2(50, 50), new Color4(200, 200, 200, 1), "serif", 30, new Vector2(1, 0), 0, new Vector2(1, 1));
		
        for (var item in this.zombies) {
            this.zombies[item].draw(ctx);
        }
        for (var item in this.guns) {
            this.guns[item].draw(ctx);
        }
    }
    //-------------
    spawnZombie() {
		var pos = new Vector2(-40, Setups.utils.randI(0, Setups.windowHeight));
		var hp = 50 * this.level;
		var speed = 50 * (this.level / 2);
		
        this.zombies.push(new Zombie(pos, hp, speed));
    }
	hitPlayer(power) {
		this.health -= power;
	}
}







