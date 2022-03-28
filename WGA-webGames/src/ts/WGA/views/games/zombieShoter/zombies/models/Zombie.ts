import { Utils } from 'src/ts/core/services/Utils';
import { Unit } from 'src/ts/WGA/common/Unit';
import { Vector2 } from 'src/ts/core/engine/Vector2';
import { Color4 } from 'src/ts/core/engine/Color4';
import { Data } from 'src/ts/app/Data';

export abstract class Zombie extends Unit {
    public Angle: number
    public Color: Color4
    public Power: number;

    constructor(position: Vector2, hp: number, speed: number) {
        super(position, new Vector2(1, 0), hp, speed, 30);

        this.Color = Utils.RandColor();
        this.Power = 20;
        this.Angle = Vector2.AngleAbsBetween(Vector2.Right, this.Direction);
    }

    public NotOnTheGameField() {
        return this.Position.X > Data.I.WindowSize.X + 100;
    }
}
