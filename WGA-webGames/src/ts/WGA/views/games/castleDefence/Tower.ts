import { Unit } from "../../../common/Unit";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { Data } from "../../../../app/Data";
import { ExDraw } from 'src/ts/WGA/services/ExDraw';
import { Utils } from 'src/ts/core/services/Utils';
import { Draw } from 'src/ts/core/services/Draw';

export class Tower extends Unit {
    public Size: Vector2;
    public Color1: Color4;
    public Color2: Color4;
    public Level: number;

    constructor(position: Vector2, hp: number, size: Vector2, level: number) {
        super(position, Data.I.Center.SUB(position).Normalize(), hp, 1, 10);
        this.Size = size;
        this.Level = level;

        this.Color1 = Utils.RandColor();
        this.Color2 = Utils.RandColor();
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Draw(draw: Draw): void {
        ExDraw.I.DrawTower(this.Position, this.Size, this.Level, this.Color1, this.Color2, 1);
    }
}
