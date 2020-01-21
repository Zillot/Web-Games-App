import { Unit } from "../../../common/Unit";
import { Color4 } from "../../../../core/engine/Color4";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Data } from "../../../../app/Data";
import { FillTriangleParams } from "../../../../core/models/drawModels/FillTriangleParams";
import { Utils } from 'src/ts/core/services/Utils';
import { Draw } from 'src/ts/core/services/Draw';
import { ExDraw } from 'src/ts/WGA/services/ExDraw';

export class Castle extends Unit {
    public Color1: Color4;
    public Color2: Color4;
    public Level: number;

    constructor(position: Vector2, hp: number) {
        super(position, Data.I.Center.SUB(position).Normalize(), hp, 1, 10);
        this.Color1 = Utils.RandColor();
        this.Color2 = Utils.RandColor();

        this.Level = 1;
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Draw(draw: Draw): void {
        ExDraw.I.DrawTower(this.Position, new Vector2(80, 100), this.Level, this.Color1, this.Color2, 1);
        ExDraw.I.DrawTower(this.Position.ADD(new Vector2(-40, 0)), new Vector2(100, 50), this.Level, this.Color1, this.Color2, 1);
        ExDraw.I.DrawTower(this.Position.ADD(new Vector2(40, 0)), new Vector2(100, 50), this.Level, this.Color1, this.Color2, 1);

        draw.TriangleFill(<FillTriangleParams>{ position: this.Position.ADD(new Vector2(0, -120)), size: new Vector2(80, 40), origin: new Vector2(0, 1), color: this.Color2 });
    }
}
