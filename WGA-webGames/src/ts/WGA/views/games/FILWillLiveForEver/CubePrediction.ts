import { Cube } from "./Cube";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { FillRectParams } from "../../../../core/models/FillRectParams";
import { Draw } from 'src/ts/core/services/Draw';

export class CubePrediction extends Cube {
    constructor(position: Vector2, fieldPosition: Vector2, size: Vector2, speed: number, color: Color4) {
        super(position, fieldPosition, size, speed, color);
    }

    public DrawPrediction(fieldOffset: Vector2, cubeSize: Vector2): void {
        super.Draw();

        var position = fieldOffset.ADD(cubeSize.MUL(this.FieldPosition));

        Draw.I.RectFill(<FillRectParams>{
            position: position,
            size: this.Size,
            scale: this.Transition.GetVal() * 0.2,
            color: Color4.Black.GetTransparent(this.Opacity.GetVal()),
            origin: new Vector2(0, 0)
        });
    }
}
