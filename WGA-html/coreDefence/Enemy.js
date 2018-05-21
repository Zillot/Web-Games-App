class Enemy extends Unit {
    //position;
    //direction;
    //maxHp;
    //hp;
    //speed;
    //color;
    //power;

    constructor(_position, _hp, _speed) {
        super(_position, Setups.center.SUB(_position).normalize(), _hp, _speed, 10);

        this.color = Setups.utils.randColor();
        this.power = 20;
        this.angle = Vector2.angleAbsBetween(Vector2.right(), this.direction);

        this.minDistance = 100;
        this.maxDistance = 600;
        this.distanceToDash = 110;
        this.radius = 3;
    }

    update(timeDelta) {
        super.update(timeDelta);

        var toCenter = Vector2.distance(this.position, Setups.center);
        var toProcess = toCenter - this.minDistance;

        if (toProcess > this.maxDistance) {
            toProcess = this.maxDistance;
        }

        this.speed = ((toProcess / this.maxDistance) * this.maxDistance);

        if (this.speed < 10) {
        	this.speed = 10;
		}

		if (toCenter < this.distanceToDash) {
        	this.speed = 1500;
		}
    }

    draw(ctx) {
    	Setups.draw.fillCircle(this.position, this.radius * 2, new Vector2(0, 0), this.color);
    }
}