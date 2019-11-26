import { Unit } from "../../../common/Unit";
import { Color4 } from "../../../../core/engine/Color4";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Data } from "../../../../app/Data";
import { Utils } from 'src/ts/core/services/Utils';
import { ExDraw } from 'src/ts/WGA/services/ExDraw';

export class Zombie extends Unit {
    public Angle: number
    public Color: Color4
    public Power: number;

    constructor(position: Vector2, hp: number, speed: number) {
        super(position, new Vector2(1, 0), hp, speed, 30);

        this.Color = Utils.RandColor();
        this.Power = 20;
        this.Angle = Vector2.AngleAbsBetween(Vector2.Right, this.Direction);
    }

    public Draw(): void {
        var scale = 0.8 + (this.Hp / this.MaxHp) * 0.2;
        ExDraw.I.DrawZombie(this.Position, this.Angle, this.Color, this.Color.GetInvertColor(), scale);
    }

    public NotOnTheGameField() {
        return this.Position.X > Data.I.WindowSize.X + 100;
    }
}
