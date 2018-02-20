class Unit {
    //position;
    //direction;
    //maxHp;
    //hp;
    //speed;

    constructor(_position, _direction, _hp, _speed, _hitDistnace) {
        this.position = _position;
        this.direction = _direction;
        this.maxHp = _hp;
        this.hp = _hp;
        this.speed = _speed;

        this.hitDistance = _hitDistnace;
    }

    update(timeDelta) {
        this.position = this.position.ADD(this.direction.MUL(this.speed * timeDelta));
    }
    draw(ctx) {
        this.drawCircle();
    }
    //-------------
    tryHit(bullet) {
        if (Vector2.distance(this.position, bullet.position) < this.hitDistance + bullet.hitDistance) {
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