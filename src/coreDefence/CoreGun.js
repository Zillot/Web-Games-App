class CoreGun extends Gun{
    //position;
    //direction;
    //power;
    //bullets;

    //reload;
    //angle;

    constructor(_rotationSpeed) {
        super(Setups.center, _rotationSpeed);
    }
    drawGun(ctx) {
        Setups.draw.rect(this.position, new Vector2(5, 5), new Vector2(0, 0), Color4.colorFromHex('#FFFF00'));
        Setups.draw.rect(this.position.ADD(this.direction.MUL(50)), new Vector2(10, 20), new Vector2(1, 0), Color4.colorFromHex('#00FF00'), this.angleControll.getVal());
    }
}