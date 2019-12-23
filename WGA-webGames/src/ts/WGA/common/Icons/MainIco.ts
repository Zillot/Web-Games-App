import { Vector2 } from "../../../core/engine/Vector2";
import { FillPolygonParams } from "../../../core/models/FillPolygonParams";
import { Color4 } from "../../../core/engine/Color4";
import { Draw } from 'src/ts/core/services/Draw';
import { BaseIco } from './BaseIco';

export class MainIco extends BaseIco {
    public Name: string;

    private moveDistance: number;
    private cubes: number;
    private size: number;
    private leftRigthDir: Vector2;

    private pointsTop: Vector2[];
    private pointsLeft: Vector2[];
    private pointsRight: Vector2[];

    constructor(position: Vector2, size: number, cubes: number, speed: number) {
        super(speed, position);

        this.leftRigthDir = new Vector2(1, 0);

        this.SetCubeData(size, cubes);
    }

    public Init(): void {

    }

    public Dispose(): void {

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

    public Draw(): void {
        var stepOffset = this.proccess.GetVal() * this.moveDistance;
        var upDownDir = Vector2.GetRotated(this.leftRigthDir, Math.PI / 2);
        var oneCubeSize = this.size / this.cubes;

        var globalOffset = stepOffset * (Math.floor(this.cubes / 2));
        var position = this.getStartPosition(globalOffset, upDownDir);

        for (var i = 0; i < this.cubes; i++) {
            for (var j = 0; j < this.cubes; j++) {
                //moving by X
                var cubePosition = position
                    .ADD(this.leftRigthDir.MUL(oneCubeSize * j + stepOffset * j - 1));

                this.drawCube(cubePosition, 0.8);
            }

            //moving by Y
            position = position
                .ADD(upDownDir.MUL(oneCubeSize + stepOffset));
        }
    }

    private getStartPosition(globalOffset: number, upDownDir: Vector2) {
        var oneCubeSize = this.size / this.cubes;
        var position = this.Position.ADD(oneCubeSize / 2);

        var mover = new Vector2(this.leftRigthDir.X, upDownDir.Y);
        position = position.SUB(mover.MUL(oneCubeSize * this.cubes / 2 + globalOffset))

        return position;
    }

    private drawCube(cubePosition: Vector2, scale: number) {
        Draw.I.PolygonFill(<FillPolygonParams>{ color: new Color4(102, 153, 255, 1), position: cubePosition, points: this.pointsTop, scale: scale });
        Draw.I.PolygonFill(<FillPolygonParams>{ color: new Color4(51, 119, 255, 1), position: cubePosition, points: this.pointsLeft, scale: scale });
        Draw.I.PolygonFill(<FillPolygonParams>{ color: new Color4(255, 133, 102, 1), position: cubePosition, points: this.pointsRight, scale: scale });
    }
}
