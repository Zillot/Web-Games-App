var CoreDefence = /** @class */ (function () {
    function CoreDefence() {
    }
    CoreDefence.prototype.Init = function () {
        this.score = 0;
        this.money = 0;
        this.health = 100;
        this.enemies = [];
        this.guns = [];
        this.level = 1;
        this.maxEnemies = 10;
        this.scoreGoal = 20;
        this.scoreCurrent = 0;
        this.enemieSpawnPause = 1;
        this.coreSafeRadius = 50;
        this.guns.push(new CoreGun(5));
    };
    CoreDefence.prototype.Update = function (timeDelta) {
        if (Setups.I.Input.GetMouseState() == MouseState.down) {
            for (var item in this.guns) {
                this.guns[item].Shoot(Setups.I.Input.MousePos);
            }
        }
        if (this.enemies.length < this.maxEnemies && this.enemieSpawnPause <= 0) {
            this.SpawnEnemy();
            this.enemieSpawnPause = 2 / this.level;
        }
        if (this.enemieSpawnPause > 0) {
            this.enemieSpawnPause -= timeDelta;
        }
        for (var item in this.enemies) {
            this.enemies[item].Update(timeDelta);
        }
        for (var item in this.guns) {
            this.guns[item].Update(timeDelta);
        }
        for (var enemyKey = 0; enemyKey < this.enemies.length; enemyKey++) {
            var enemy = this.enemies[enemyKey];
            var closeEnought = Vector2.Distance(enemy.Position, Setups.I.Center) < this.coreSafeRadius + enemy.Radius;
            var notToClose = Vector2.Distance(enemy.Position, Setups.I.Center) > this.coreSafeRadius - enemy.Radius * 2;
            if (closeEnought && !notToClose) {
                var enemyAngle = Vector2.Left().AngleTo(enemy.Position.SUB(Setups.I.Center));
                var rightGunAngle = this.guns.filter(function (x) { return x.CoveredByShield(enemyAngle); })[0];
                if (rightGunAngle) {
                    this.score += 10;
                    this.enemies.splice(enemyKey--, 1);
                    continue;
                }
            }
            var demageClose = Vector2.Distance(enemy.Position, Setups.I.Center) < this.coreSafeRadius * 0.75;
            if (demageClose) {
                this.score -= 5;
                this.enemies.splice(enemyKey--, 1);
                this.HitPlayer(enemy.Power);
            }
        }
        if (this.scoreCurrent >= this.scoreGoal) {
            this.scoreGoal = this.scoreGoal * 3;
            this.maxEnemies += (2 * this.level);
            this.level++;
        }
    };
    CoreDefence.prototype.Draw = function (ctx) {
        Setups.I.Draw.CircleStroke({ position: Setups.I.Center, radius: this.coreSafeRadius, color: Color4.Gray().GetTransparent(0.1) });
        for (var item in this.enemies) {
            this.enemies[item].Draw(ctx);
        }
        for (var item in this.guns) {
            this.guns[item].Draw(ctx);
        }
        Setups.I.Draw.RectFill({ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, 60), origin: new Vector2(1, 1), color: new Color4(0, 0, 0, 0.1) });
        Setups.I.Draw.TextFill({ str: "Level: " + this.level, position: new Vector2(Setups.I.WindowWidth / 2, 5), color: Color4.Gray(), fontName: "serif", fontSize: 30, origin: new Vector2(0, -1) });
        Setups.I.Draw.TextFill({ str: "Score: " + this.score, position: new Vector2(Setups.I.WindowWidth / 2, 35), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(0, -1) });
        Setups.I.Draw.TextFill({ str: this.money + " :Money", position: new Vector2(Setups.I.WindowWidth - 10, 7), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });
        Setups.I.Draw.TextFill({ str: this.health + " :Health", position: new Vector2(Setups.I.WindowWidth - 10, 33), color: Color4.Gray(), fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });
    };
    //-------------
    CoreDefence.prototype.SpawnEnemy = function () {
        var x = Setups.I.Utils.RandI(-100, Setups.I.WindowWidth + 100);
        var y = 0;
        if (x < 0 || x > Setups.I.WindowWidth) {
            y = Setups.I.Utils.RandI(-100, Setups.I.WindowHeight + 100);
        }
        else {
            if (Setups.I.Utils.RandI(0, 1) >= 1) {
                y = Setups.I.Utils.RandI(-100, -10);
            }
            else {
                y = Setups.I.Utils.RandI(Setups.I.WindowHeight + 10, Setups.I.WindowHeight + 100);
            }
        }
        var pos = new Vector2(x, y);
        var hp = 50 * this.level;
        var speed = 200 * (this.level / 2);
        this.enemies.push(new Enemy(pos, hp, speed));
    };
    CoreDefence.prototype.HitPlayer = function (power) {
        this.health -= power;
    };
    return CoreDefence;
}());
//# sourceMappingURL=CoreDefence.js.map