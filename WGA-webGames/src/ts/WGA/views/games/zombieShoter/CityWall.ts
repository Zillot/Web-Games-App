import { Unit } from "../../../common/Unit";
import { Color4 } from "../../../../core/engine/Color4";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Data } from "../../../../app/Data";
import { StrokePolygonParams } from "../../../../core/models/StrokePolygonParams";
import { Draw } from 'src/ts/core/services/Draw';

export class CityWall extends Unit {
    public Color: Color4
    public Level: number;

    private points: Vector2[];

    constructor(position: Vector2, hp: number) {
        super(position, new Vector2(1, 0), hp, 0, 30);

        this.points = [];
        this.Color = Color4.Blue;
        this.Level = 1;

        this.createWallPoints(100, 20);
    }

    private createWallPoints(step: number, width: number) {
        var y = Data.I.WindowSize.Y;
        var yOffset = y / 2; 

        while (y > 0) {
            this.points.push(new Vector2(0, y - yOffset));
            this.points.push(new Vector2(-width, y - (step / 2) - yOffset));

            y -= step;
        }
    }

    public Draw(): void {
        Draw.I.PolygonStroke(<StrokePolygonParams> {
            position: this.Position,
            origin: new Vector2(0, 0),
            color: this.Color,
            points: this.points,
            thickness: 1
        });
    }
}
