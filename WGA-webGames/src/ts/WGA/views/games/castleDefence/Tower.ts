import { Unit } from "../../../common/Unit";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { Data } from "../../../../app/Data";

export class Tower extends Unit {
    public Size: Vector2;
    public Color1: Color4;
    public Color2: Color4;
    public Level: number;

    constructor(position: Vector2, hp: number, size: Vector2, level: number) {
        super(position, Data.I.Center.SUB(position).Normalize(), hp, 1, 10);
        this.Size = size;
        this.Level = level;

        this.Color1 = Data.I.Utils.RandColor();
        this.Color2 = Data.I.Utils.RandColor();
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Draw(): void {
        Data.I.ExDraw.DrawTower(this.Position, this.Size, this.Level, this.Color1, this.Color2, 1);
    }
}
