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
        this.killed = 0;
		this.score = 0;
        this.money = 0;
        this.health = 100;
		
        this.zombies = [];
        this.guns = [];
		
        this.level = 1;
        this.maxZombies = 4;
        this.scoreGoal = 20;
        this.scoreCurrent = 0;
        this.zombieSpawnPause = 0;
		
        this.guns.push(new Gun(new Vector2(Setups.windowWidth - 50, Setups.windowHeight / 2), 0.5));
	}

    update(timeDelta) {
        if (Setups.input.getMouseState() == MouseState.down) {
            for (var item in this.guns) {
                this.guns[item].shoot(Setups.input.mousePos);
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
                        this.score += 10;

					    if (zombie.hp <= 0) {
                            this.killed++;
                        }

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
        for (var item in this.zombies) {
            this.zombies[item].draw(ctx);
        }
        for (var item in this.guns) {
            this.guns[item].draw(ctx);
        }

        Setups.draw.rect(new Vector2(0, 0), new Vector2(Setups.windowWidth, 60), new Vector2(1, 1), new Color4(0, 0, 0, 0.1));

        Setups.draw.textFill("Killed: " + this.killed, new Vector2(10, 29), Color4.Gray(), "serif", 18, new Vector2(-1, 0), 0, new Vector2(1, 1));
        Setups.draw.textFill("Level: " + this.level, new Vector2(Setups.windowWidth / 2, 5), Color4.Gray(), "serif", 30, new Vector2(0, -1), 0, new Vector2(1, 1));
        Setups.draw.textFill("Score: " + this.score, new Vector2(Setups.windowWidth / 2, 35), Color4.Gray(), "serif", 18, new Vector2(0, -1), 0, new Vector2(1, 1));
        Setups.draw.textFill(this.money + " :Money", new Vector2(Setups.windowWidth - 10, 7), Color4.Gray(), "serif", 18, new Vector2(1, -1), 0, new Vector2(1, 1));
        Setups.draw.textFill(this.health + " :Health", new Vector2(Setups.windowWidth - 10, 33), Color4.Gray(), "serif", 18, new Vector2(1, -1), 0, new Vector2(1, 1));
    }
    //-------------
    spawnZombie() {
		var pos = new Vector2(-40, Setups.utils.randI(100, Setups.windowHeight - 50));
		var hp = 50 * this.level;
		var speed = 50 * (this.level / 2);
		
        this.zombies.push(new Zombie(pos, hp, speed));
    }
	hitPlayer(power) {
		this.health -= power;
	}
}







