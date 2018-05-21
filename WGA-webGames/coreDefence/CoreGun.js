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
        var value = this.angleControll.getVal() + Math.PI;
        var color1 = Color4.colorFromHex('#7777FF');
        var color2 = Color4.colorFromHex('#7777FF');

        Setups.draw.fillCircle(this.position, 30, new Vector2(0, 0), color1.getTransparent(0.2));
        Setups.draw.fillCircle(this.position, 10, new Vector2(0, 0), color1.getTransparent(0.5));
        Setups.draw.fillCircle(this.position, 6, new Vector2(0, 0), color1.getTransparent(0.5));

        var forward = Vector2.left().rotateTo(value - Math.PI);
        var side = Vector2.left().rotateTo(value - Math.PI + Math.PI / 2);
        var point = this.position.ADD(forward.MUL(54));

        Setups.draw.arc(this.position, 50, value + 0.09, value + this.width / 2, 1, new Vector2(0, 0), color2);
        Setups.draw.arc(this.position, 50, value - 0.09, value - this.width / 2, 1, new Vector2(0, 0), color2);

        Setups.draw.line(point, point.ADD(side.MUL(4)).ADD(forward.MUL(-4)), 1, color2);
        Setups.draw.line(point, point.ADD(side.MUL(-4)).ADD(forward.MUL(-4)), 1, color2);
    }

    //-------
    coveredByShield(angle) {
        var value = Vector2.left().angleTo(this.direction);
        return angle > value - this.width / 2 && angle < value + this.width / 2;
    }
}