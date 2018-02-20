class Gun {
    //position;
    //direction;
    //power;
    //bullets;

    //reload;
	//angle;

    constructor(_position, _rotationSpeed) {
        this.power = 10;
        this.direction = new Vector2(-1, 0);
        this.position = _position;

        this.bullets = [];

        this.reload = 0;
		
		this.angleControll = new Value(0, _rotationSpeed);
    }

    update(timeDelta) {
        var toMouseDir = Setups.input.mousePos.SUB(this.position).normalize();
        var delta = Vector2.angleAbsBetween(this.direction, toMouseDir);

        this.angleControll.goToDelta(delta);
		this.angleControll.update(timeDelta);

        this.direction = Vector2.left().rotateTo(this.angleControll.getVal());
		
        if (this.reload > 0) {
            this.reload -= timeDelta;
        }

        for (var item in this.bullets) {
            this.bullets[item].update(timeDelta);
        }
    }
    draw(ctx) {
        this.drawBullets(ctx);
        this.drawGun(ctx);
    }
    //-------------
    drawBullets(ctx) {
        for (var item in this.bullets) {
            this.bullets[item].draw(ctx);
        }
    }

    drawGun(ctx) {
        Setups.draw.rect(this.position, new Vector2(50, 10), new Vector2(1, 0), Color4.colorFromHex('#00FF00'), this.angleControll.getVal());
        Setups.draw.rect(this.position, new Vector2(5, 5), new Vector2(0, 0), Color4.colorFromHex('#FFFF00'));
    }

    shoot(point) {
        if (this.reload <= 0) {
            this.reload = 0.3;
            var pos = this.position;
			var power = 10;
            var speed = 1000 + Setups.utils.randF(-1, 1);

            this.bullets.push(new Bullet(pos.ADD(this.direction.MUL(40)), this.direction, power, speed));
        }
    }
}