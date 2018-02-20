class CoreDefence {
    //enemies;
    //guns;

    //maxEnemies;
    //enemieSpawnPause;

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
		
        this.enemies = [];
        this.guns = [];
		
        this.level = 1;
        this.maxEnemies = 6;
        this.scoreGoal = 20;
        this.scoreCurrent = 0;
        this.enemieSpawnPause = 0;

        this.coreSafeRadius = 30;

        this.guns.push(new CoreGun(5));
	}

    update(timeDelta) {
        if (Setups.input.getMouseState() == MouseState.down) {
            for (var item in this.guns) {
                this.guns[item].shoot(Setups.input.mousePos);
            }
        }

        if (this.enemies.length < this.maxEnemies && this.enemieSpawnPause <= 0) {
            this.spawnEnemy();
            this.enemieSpawnPause = 4 / this.level;
        }

        if (this.enemieSpawnPause > 0) {
            this.enemieSpawnPause -= timeDelta;
        }

        for (var item in this.enemies) {
            this.enemies[item].update(timeDelta);
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

				for (var enemyKey = 0; enemyKey < this.enemies.length; enemyKey++) {
					var enemy = this.enemies[enemyKey];
					var hit = enemy.tryHit(bullet);
					
					if (hit) {
						gun.bullets.splice(bulletKey--, 1);
					}

					if (enemy.hp <= 0 || Vector2.distance(enemy.position, Setups.center) < this.coreSafeRadius) {
                        this.score += 10;

					    if (enemy.hp <= 0) {
                            this.killed++;
                        }

						this.enemies.splice(enemyKey--, 1);
						this.hitPlayer(enemy.power);
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
            this.maxEnemies += (2 * this.level);
            this.level++;
        }
    }
    draw(ctx) {
        Setups.draw.strokeCircle(Setups.center, this.coreSafeRadius, 1, new Vector2(0, 0), Color4.Gray().getTransparent(0.1));

        for (var item in this.enemies) {
            this.enemies[item].draw(ctx);
        }
        for (var item in this.guns) {
            this.guns[item].draw(ctx);
        }

        Setups.draw.fillRect(new Vector2(0, 0), new Vector2(Setups.windowWidth, 60), new Vector2(1, 1), new Color4(0, 0, 0, 0.1));

        Setups.draw.textFill("Killed: " + this.killed, new Vector2(10, 29), Color4.Gray(), "serif", 18, new Vector2(-1, 0), 0, new Vector2(1, 1));
        Setups.draw.textFill("Level: " + this.level, new Vector2(Setups.windowWidth / 2, 5), Color4.Gray(), "serif", 30, new Vector2(0, -1), 0, new Vector2(1, 1));
        Setups.draw.textFill("Score: " + this.score, new Vector2(Setups.windowWidth / 2, 35), Color4.Gray(), "serif", 18, new Vector2(0, -1), 0, new Vector2(1, 1));
        Setups.draw.textFill(this.money + " :Money", new Vector2(Setups.windowWidth - 10, 7), Color4.Gray(), "serif", 18, new Vector2(1, -1), 0, new Vector2(1, 1));
        Setups.draw.textFill(this.health + " :Health", new Vector2(Setups.windowWidth - 10, 33), Color4.Gray(), "serif", 18, new Vector2(1, -1), 0, new Vector2(1, 1));
    }
    //-------------
    spawnEnemy() {
        var x = Setups.utils.randI(-100, Setups.windowWidth + 100);
        var y = 0;

        if (x < 0 || x > Setups.windowWidth) {
            y = Setups.utils.randI(-100, Setups.windowHeight + 100);
        }
        else {
            if (Setups.utils.randI(0, 1) >= 1) {
                y = Setups.utils.randI(-100, -10);
            }
            else {
                y = Setups.utils.randI(Setups.windowHeight + 10, Setups.windowHeight + 100);
            }
        }

		var pos = new Vector2(x, y);
		var hp = 50 * this.level;
		var speed = 200 * (this.level / 2);
		
        this.enemies.push(new Enemy(pos, hp, speed));
    }
	hitPlayer(power) {
		this.health -= power;
	}
}







