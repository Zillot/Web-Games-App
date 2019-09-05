import { Unit } from "../../../common/Unit";
import { Color4 } from "../../../../core/engine/Color4";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Setups } from "../../../../app/Setups";
import { FillTriangleParams } from "../../../../core/models/FillTriangleParams";

export class Castle extends Unit {
    public Color1: Color4;
    public Color2: Color4;
    public Level: number;

    constructor(position: Vector2, hp: number) {
        super(position, Setups.I.Center.SUB(position).Normalize(), hp, 1, 10);
        this.Color1 = Setups.I.Utils.RandColor();
        this.Color2 = Setups.I.Utils.RandColor();

        this.Level = 1;
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Draw(): void {
        Setups.I.ExDraw.DrawTower(this.Position, new Vector2(80, 100), this.Level, this.Color1, this.Color2, 1);
        Setups.I.ExDraw.DrawTower(this.Position.ADD(new Vector2(-40, 0)), new Vector2(100, 50), this.Level, this.Color1, this.Color2, 1);
        Setups.I.ExDraw.DrawTower(this.Position.ADD(new Vector2(40, 0)), new Vector2(100, 50), this.Level, this.Color1, this.Color2, 1);

        Setups.I.Draw.TriangleFill(<FillTriangleParams>{ position: this.Position.ADD(new Vector2(0, -120)), size: new Vector2(80, 40), origin: new Vector2(0, 1), color: this.Color2 });
    }
}
