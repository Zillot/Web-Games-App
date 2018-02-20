class Zombie extends Unit {
    //position;
    //direction;
    //maxHp;
    //hp;
    //speed;
    //color;
    //power;

    constructor(_position, _hp, _speed) {
        super(_position, new Vector2(1, 0), _hp, _speed);

        this.color = Setups.utils.randColor();
		this.power = 20;
    }

    draw(ctx) {
		var scale = 0.8 + (this.hp / this.maxHp) * 0.2;
		this.drawZombie(this.position, 0, this.color, this.color.getInvertColor(), scale);
    }
}