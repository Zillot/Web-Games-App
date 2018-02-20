class CoreGun extends Gun{
    //position;
    //direction;
    //power;
    //bullets;

    //reload;
    //angle;

    constructor(_rotationSpeed) {
        super(Setups.center, _rotationSpeed);

        this.width = 1;
    }
    drawGun(ctx) {
        Setups.draw.fillCircle(this.position, 30, new Vector2(0, 0), Color4.colorFromHex('#7777FF').getTransparent(0.2));
        Setups.draw.fillCircle(this.position, 10, new Vector2(0, 0), Color4.colorFromHex('#7777FF').getTransparent(0.5));

        Setups.draw.arc(this.position, 50, this.angleControll.getVal() + Math.PI - this.width / 2, this.angleControll.getVal() + Math.PI + this.width / 2, new Vector2(0, 0), Color4.colorFromHex('#00FF00'));
        Setups.draw.arc(this.position, 50, this.angleControll.getVal() + Math.PI - this.width / 2, this.angleControll.getVal() + Math.PI + this.width / 2, new Vector2(0, 0), Color4.colorFromHex('#00FF00'));
    }
}