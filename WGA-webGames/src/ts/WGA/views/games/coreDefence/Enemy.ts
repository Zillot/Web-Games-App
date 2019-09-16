import { Color4 } from "../../../../core/engine/Color4";
import { Unit } from "../../../common/Unit";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Data } from "../../../../app/Data";
import { LineParams } from "../../../../core/models/LineParams";
import { FillCircleParams } from "../../../../core/models/FillCircleParams";

export class Enemy extends Unit {
    public Color: Color4;
    public Power: number;
    public Angle: number;

    public MinDistance: number;
    public MaxDistance: number;
    public DistanceToDash: number;
    public Radius: number;

    constructor(position: Vector2, hp: number, speed: number) {
        super(position, Data.I.Center.SUB(position).Normalize(), hp, speed, 10);

        this.Color = Data.I.Utils.RandColor();
        this.Power = 20;
        this.Angle = Vector2.AngleAbsBetween(Vector2.Right, this.Direction);

        this.MinDistance = 100;
        this.MaxDistance = 600;
        this.DistanceToDash = 110;
        this.Radius = 3;
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        var toCenter = Vector2.Distance(this.Position, Data.I.Center);
        var toProcess = toCenter - this.MinDistance;

        if (toProcess > this.MaxDistance) {
            toProcess = this.MaxDistance;
        }

        this.CalculateSpeed(toProcess, toCenter);
    }

    public CalculateSpeed(toProcess: number, toCenter: number) {
        this.Speed = ((toProcess / this.MaxDistance) * this.MaxDistance);

        if (this.Speed < 10) {
            this.Speed = 10;
        }

        if (toCenter < this.DistanceToDash) {
            this.Speed = 1500;
        }
    }

    public Draw(): void {
        var toCenter = Vector2.Distance(this.Position, Data.I.Center);
        var dashCoef = this.DistanceToDash / toCenter;
        dashCoef = dashCoef > 1 ? 1 : dashCoef;
        dashCoef = dashCoef < 0 ? 0 : dashCoef;

        if (toCenter > this.DistanceToDash) {
            Data.I.Draw.Line(<LineParams>{ pointFrom: this.Direction.MUL(-1000).ADD(Data.I.Center), pointTo: this.Position, color: this.Color, thickness: this.Radius * 5 * (1 - dashCoef) });
        }

        Data.I.Draw.CircleFill(<FillCircleParams>{ position: this.Position, radius: this.Radius * 1.5 + this.Radius * 2 * (1 - dashCoef), color: this.Color });
        Data.I.Draw.CircleFill(<FillCircleParams>{ position: this.Position, radius: this.Radius * 1.5 + this.Radius * 2 * (1 - dashCoef), color: Color4.Black.GetTransparent(dashCoef) });
    }
}
