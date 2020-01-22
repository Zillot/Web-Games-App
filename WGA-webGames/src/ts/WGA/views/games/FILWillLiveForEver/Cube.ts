import { FillRectParams } from "../../../../core/models/drawModels/FillRectParams";
import { Data } from "../../../../app/Data";
import { Vector2 } from "../../../../core/engine/Vector2";
import { TransitionValue } from "../../../../core/engine/TransitionValue";
import { Color4 } from "../../../../core/engine/Color4";
import { Unit } from "../../../common/Unit";
import { Draw } from 'src/ts/core/services/Draw';

export class Cube extends Unit {
    public Color: Color4;
    public Size: Vector2;
    public Transition: TransitionValue;
    public Opacity: TransitionValue;
    public FieldPosition: Vector2;

    constructor(position: Vector2, fieldPosition: Vector2, size: Vector2, speed: number, color: Color4) {
        super(position, Data.I.Center.SUB(position).Normalize(), 1, speed, 10);

        this.Transition = new TransitionValue(0, 1);
        this.Opacity = new TransitionValue(0, 1);

        this.FieldPosition = fieldPosition;
        this.Size = size;
        this.Color = color;
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        this.Transition.Update(timeDelta);
        this.Opacity.Update(timeDelta);
    }

    public Draw(draw: Draw): void {
        draw.RectFill(<FillRectParams> {
            position: this.Position,
            size: this.Size,
            scale: this.Transition.GetVal(),
            color: this.Color.GetTransparent(this.Opacity.GetVal()),
            origin: new Vector2(0, 0)
        });
    }
}
