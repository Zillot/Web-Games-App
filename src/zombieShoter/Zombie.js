class Zombie extends Unit {
    //position;
    //direction;
    //maxHp;
    //hp;
    //speed;
    //color;
    //power;

    constructor(_position, _hp, _speed) {
        super(_position, new Vector2(1, 0), _hp, _speed, 30);

        this.color = Setups.utils.randColor();
		this.power = 20;
		this.angle = Vector2.angleAbsBetween(Vector2.right(), this.direction);
    }

    draw(ctx) {
		var scale = 0.8 + (this.hp / this.maxHp) * 0.2;
        Setups.draw.drawZombie(this.position, this.angle, this.color, this.color.getInvertColor(), scale);
    }
}