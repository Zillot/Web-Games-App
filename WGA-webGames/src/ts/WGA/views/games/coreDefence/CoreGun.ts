import { Vector2 } from "../../../../core/engine/Vector2";
import { Gun } from "../../../common/Gun";
import { Bullet } from "../../../common/Bullet";
import { Color4 } from "../../../../core/engine/Color4";
import { Data } from "../../../../app/Data";
import { StrokeArcParams } from "../../../../core/models/StrokeArcParams";
import { LineParams } from "../../../../core/models/LineParams";
import { Draw } from 'src/ts/core/services/Draw';

export class CoreGun extends Gun {
    public Position: Vector2;
    public Direction: Vector2;
    public Power: number;
    public Bullets: Bullet[];

    public Reload: number;
    public Angle: number;
    public Width: number;

    public Color: Color4;

    constructor(rotationSpeed: number) {
        super(Data.I.Center, rotationSpeed);

        this.Width = 1;
        this.Color = Color4.ColorFromHex('#7777FF');
    }

    protected drawGun(): void {
        var value = this.AngleControll.GetVal() + Math.PI;

        var forward = Vector2.Left.RotateTo(value - Math.PI);
        var side = Vector2.Left.RotateTo(value - Math.PI + Math.PI / 2);
        var point = this.Position.ADD(forward.MUL(54));

        //shild part
        Draw.I.ArcStroke(<StrokeArcParams>{ position: this.Position, radius: 50, startAngle: value + 0.09, endAngle: value + this.Width / 2, color: this.Color });
        Draw.I.ArcStroke(<StrokeArcParams>{ position: this.Position, radius: 50, startAngle: value - 0.09, endAngle: value - this.Width / 2, color: this.Color });

        //arrow in the center
        Draw.I.Line(<LineParams>{ pointFrom: point, pointTo: point.ADD(side.MUL(4)).ADD(forward.MUL(-4)), thickness: 1, color: this.Color });
        Draw.I.Line(<LineParams>{ pointFrom: point, pointTo: point.ADD(side.MUL(-4)).ADD(forward.MUL(-4)), thickness: 1, color: this.Color });
    }

    //-------
    public CoveredByShield(angle: number): boolean {
        var value = this.Direction.AngleAbsTo(Vector2.Left);
        return angle > value - this.Width / 2 && angle < value + this.Width / 2;
    }
}
