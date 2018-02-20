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
		Setups.draw.fillRect(this.position, new Vector2(5, 5), new Vector2(0, 0), Color4.Black());
    }
}