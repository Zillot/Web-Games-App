import { Vector2 } from "../../../core/engine/Vector2";
import { BaseIco } from 'src/ts/core/ui/BaseIco';
import { Draw } from 'src/ts/core/services/Draw';
import { FillRectParams } from 'src/ts/core/models/drawModels/FillRectParams';
import { Color4 } from 'src/ts/core/engine/Color4';

export class LevelUpIco extends BaseIco {
    private size: number;

    constructor(position: Vector2, size: number, speed: number) {
        super(speed, position);

        this.size = size;
    }

    public Init(): void {

    }

    public Dispose(): void {

    }

    public Draw(draw: Draw): void {
        var lines = 5;
        var period = 2 / lines;
        var step = (this.proccess.GetVal() * period);

        var startOffset = Vector2.Down.MUL(this.size / 3);
        var moveStep = Vector2.Up.MUL((this.size * 0.9) / lines);
        var positionDelta = this.position.GetCopy()
            .ADD(startOffset)
            .ADD(moveStep.MUL(this.proccess.GetVal()));

        for (var i = 0; i < lines; i++) {
            var opacity = period * i + step;

            if (opacity > 1) {
                opacity = 2 - opacity;
            }

            draw.RectFill(<FillRectParams>{ position: positionDelta.ADD(this.offset), angle: -0.38, size: new Vector2(this.size * (0.4), this.size * (0.07)), color: Color4.Green.GetTransparent(opacity), origin: new Vector2(1, -1), });
            draw.RectFill(<FillRectParams>{ position: positionDelta.ADD(this.offset), angle: 0.38, size: new Vector2(this.size * (0.4), this.size * (0.07)), color: Color4.Green.GetTransparent(opacity), origin: new Vector2(-1, -1), });

            positionDelta.ADDE(moveStep);
        }
    }

    protected endMoving() {
        this.proccess.SetValue(0);
        this.startMoving();
    }
}
