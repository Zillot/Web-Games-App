import { Vector2 } from "../../../core/engine/Vector2";
import { FillPolygonParams } from "../../../core/models/drawModels/FillPolygonParams";
import { Color4 } from "../../../core/engine/Color4";
import { Draw } from 'src/ts/core/services/Draw';
import { BaseIco } from 'src/ts/core/ui/BaseIco';

export class MainIco extends BaseIco {
    public Name: string;

    private moveDistance: number;
    private cubes: number;
    private size: number;

    private pointsTop: Vector2[];
    private pointsLeft: Vector2[];
    private pointsRight: Vector2[];

    constructor(position: Vector2, size: number, cubes: number, speed: number) {
        super(speed, position);

        if (cubes < 3) {
            throw "MainIco.cs: cubes count cannot be less then 3";
        }

        this.SetCubeData(size, cubes);
    }

    public SetCubeData(size: number, cubes: number) {
        this.cubes = cubes;
        this.size = size;

        var oneCubeSize = size / cubes;
        this.moveDistance = oneCubeSize / 3;

        this.pointsTop = [
            new Vector2(0, 0),
            new Vector2(-oneCubeSize / 2, -oneCubeSize / 2),
            new Vector2(oneCubeSize / 2, -oneCubeSize / 2),
        ];
        this.pointsLeft = [
            new Vector2(0, 0),
            new Vector2(-oneCubeSize / 2, -oneCubeSize / 2),
            new Vector2(-oneCubeSize / 2, oneCubeSize / 2),
            new Vector2(0, oneCubeSize / 2),
        ];
        this.pointsRight = [
            new Vector2(0, 0),
            new Vector2(oneCubeSize / 2, -oneCubeSize / 2),
            new Vector2(oneCubeSize / 2, oneCubeSize / 2),
            new Vector2(0, oneCubeSize / 2),
        ];
    }

    public Draw(draw: Draw): void {
        var stepOffset = this.proccess.GetVal() * this.moveDistance;
        var oneCubeSize = this.size / this.cubes;

        var globalOffset = stepOffset * (Math.floor(this.cubes / 2));
        var position = this.getStartPosition(globalOffset);

        for (var i = 0; i < this.cubes; i++) {
            for (var j = 0; j < this.cubes; j++) {
                //moving by X
                var ooffsseett = Vector2.Right.MUL(oneCubeSize * j + stepOffset * j);
                var cubePosition = position
                    .ADD(ooffsseett);

                this.drawCube(draw, cubePosition, 0.8);
            }

            //moving by Y
            position = position
                .ADD(Vector2.Down.MUL(oneCubeSize + stepOffset));
        }
    }

    private getStartPosition(globalOffset: number) {
        var oneCubeSize = this.size / this.cubes;
        var position = this.Position.ADD(oneCubeSize / 2);

        var mover = new Vector2(Vector2.Right.X, Vector2.Down.Y);
        position = position.SUB(mover.MUL(oneCubeSize * this.cubes / 2 + globalOffset))

        return position;
    }

    private drawCube(draw: Draw, cubePosition: Vector2, scale: number) {
        draw.PolygonFill(<FillPolygonParams>{ color: new Color4(102, 153, 255, 1), position: cubePosition.ADD(this.offset), points: this.pointsTop, scale: scale });
        draw.PolygonFill(<FillPolygonParams>{ color: new Color4(51, 119, 255, 1), position: cubePosition.ADD(this.offset), points: this.pointsLeft, scale: scale });
        draw.PolygonFill(<FillPolygonParams>{ color: new Color4(255, 133, 102, 1), position: cubePosition.ADD(this.offset), points: this.pointsRight, scale: scale });
    }
}
