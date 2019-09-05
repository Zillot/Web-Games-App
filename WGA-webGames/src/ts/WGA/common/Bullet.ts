import { Deleteable } from "../../core/abstracts/Deleteable";
import { Vector2 } from "../../core/engine/Vector2";
import { Setups } from "../../app/Setups";
import { FillRectParams } from "../../core/models/FillRectParams";
import { Color4 } from "../../core/engine/Color4";

export class Bullet extends Deleteable {
    public Position: Vector2;
    public Direction: Vector2;
    public Power: number;
    public Speed: number;
    public HitDistance: number;

    constructor(position: Vector2, direction: Vector2, power: number, speed: number) {
        super();

        this.Position = position.GetCopy();
        this.Direction = direction.GetCopy();
        this.Power = power * 2;
        this.Speed = speed;

        this.HitDistance = 3;
    }

    public Update(timeDelta: number): void {
        this.Position = this.Position.ADD(this.Direction.MUL(this.Speed * timeDelta));
    }
    public Draw(): void {
        Setups.I.Draw.RectFill(<FillRectParams>{ position: this.Position, size: new Vector2(5, 5), color: Color4.Black });
    }

    public NotOnTheGameField() {
        return this.Position.X < -100
    }
}
