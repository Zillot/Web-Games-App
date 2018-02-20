class Enemy extends Unit {
    //position;
    //direction;
    //maxHp;
    //hp;
    //speed;
    //color;
    //power;

    constructor(_position, _hp, _speed) {
		super(_position, Setups.center.SUB(_position).normalize(), _hp, _speed);

        this.color = Setups.utils.randColor();
		this.power = 20;
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
}