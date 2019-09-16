import { IDrawable } from "../../../core/interfaces/IDrawable";
import { IUiComponent } from "../../../core/ui/Interfaces/IUiComponent";
import { IUpdateable } from "../../../core/interfaces/IUpdateable";
import { Vector2 } from "../../../core/engine/Vector2";
import { Value } from "../../../core/engine/Value";
import { FillCircleParams } from "../../../core/models/FillCircleParams";
import { Color4 } from "../../../core/engine/Color4";
import { Data } from "../../../app/Data";

export class SpinnerIco implements IUpdateable, IDrawable, IUiComponent {
    public Position: Vector2;

    public Name: string;

    private speed: number;
    private circles: number;
    private radius: number;

    private proccess: Value;

    constructor(position: Vector2, radius: number, circles: number, speed: number) {
        this.Position = position;
        this.speed = speed;
        this.radius = radius;
        this.circles = circles;
        this.proccess = new Value(0, speed);
        this.startMoving(this);
    }

    public Init(): void {

    }

    public Dispose(): void {

    }

    public Pause() {
        this.proccess.Pause();
    }

    public Play() {
        this.proccess.Play();
    }

    public Update(timeDelta: number): void {
        this.proccess.Update(timeDelta);
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
            Data.I.Draw.CircleFill(<FillCircleParams>{ color: Color4.Blue, radius: this.radius / (this.circles / 3), scale: scale, position: cubePosition });
            direction = direction.RotateTo(rotateStep);
        }
    }

    private startMoving(those: any) {
        those.proccess.GoTo(1, those.speed, () => {
            those.endMoving(those);
        });
    }

    private endMoving(those: any) {
        those.proccess.SetValue(0);
        those.startMoving(those);
    }
}
