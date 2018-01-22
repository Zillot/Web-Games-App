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
		
		this.power = 20;
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
		Setups.draw.rect(this.position.ADD(offset), size, new Vector2(0, 0), color, 0, scale);
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