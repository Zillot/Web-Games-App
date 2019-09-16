import { FillRectParams } from "../../../../core/models/FillRectParams";
import { Data } from "../../../../app/Data";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Value } from "../../../../core/engine/Value";
import { Color4 } from "../../../../core/engine/Color4";
import { Unit } from "../../../common/Unit";

export class Cube extends Unit {
    public Color: Color4;
    public Size: Vector2;
    public Transition: Value;
    public Opacity: Value;
    public FieldPosition: Vector2;

    constructor(position: Vector2, fieldPosition: Vector2, size: Vector2, speed: number, color: Color4) {
        super(position, Data.I.Center.SUB(position).Normalize(), 1, speed, 10);

        this.Transition = new Value(0, 1);
        this.Opacity = new Value(0, 1);

        this.FieldPosition = fieldPosition;
        this.Size = size;
        this.Color = color;
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        this.Transition.Update(timeDelta);
        this.Opacity.Update(timeDelta);
    }

    public Draw(): void {
        Data.I.Draw.RectFill(<FillRectParams> {
            position: this.Position,
            size: this.Size,
            scale: this.Transition.GetVal(),
            color: this.Color.GetTransparent(this.Opacity.GetVal()),
            origin: new Vector2(0, 0)
        });
    }
}
