import { Vector2 } from "../../../core/engine/Vector2";
import { FillCircleParams } from "../../../core/models/FillCircleParams";
import { Color4 } from "../../../core/engine/Color4";
import { Draw } from 'src/ts/core/services/Draw';
import { BaseIco } from './BaseIco';

export class SpinnerIco extends BaseIco {
    public Name: string;

    private circles: number;
    private radius: number;

    constructor(position: Vector2, radius: number, circles: number, speed: number) {
        super(speed, position);
        
        this.radius = radius;
        this.circles = circles;
    }

    public Init(): void {

    }

    public Dispose(): void {

    }

    public Draw(): void {
        var count = Math.floor(this.circles / 3);
        var min = 0.75 / count;
        var step = min;
        var max = min + step * count;
        var rotateStep = ((Math.PI * 2) / this.circles);
        var direction = Vector2.Up.RotateTo(-rotateStep * count + rotateStep * this.proccess.GetVal());

        for (var j = 0; j < this.circles; j++) {
            //moving by X
            var cubePosition = this.Position.ADD(direction.MUL(this.radius));
            var additional = this.proccess.GetVal() * step;

            var scale = 0;
            if (j < count) {
                scale = min + j * step + additional;
            }
            else if (j == count) {
                scale = max - additional;
            }
            else {
                scale = max - (j - count) * step - additional;
            }

            scale = scale < 0.3 ? 0.3 : scale;
            Draw.I.CircleFill(<FillCircleParams>{ color: Color4.Blue, radius: this.radius / (this.circles / 3), scale: scale, position: cubePosition });
            direction = direction.RotateTo(rotateStep);
        }
    }

    protected endMoving() {
        this.proccess.SetValue(0);
        this.startMoving();
    }
}
