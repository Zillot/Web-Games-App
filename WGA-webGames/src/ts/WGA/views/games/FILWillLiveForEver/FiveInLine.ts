import { GamePage } from "../../../../core/abstracts/GamePage";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { Game } from "../../../../core/services/Game";
import { Cube } from "./Cube";
import { CubePrediction } from "./CubePrediction";
import { FiveInLIneUI } from "./FiveInLine.ui";
import { Data } from "../../../../app/Data";
import { TextParams } from "../../../../core/models/TextParams";
import { Utils } from 'src/ts/core/services/Utils';
import { Draw } from 'src/ts/core/services/Draw';

export class FiveInLIne extends GamePage {
    private static INITIAL_CUBES: number = 15;
    private static MOVE_SPEED: number = 1;

    private static CUDE_SIZE: Vector2 = new Vector2(15, 15);

    private static COLORS: Color4[] = [Color4.Yellow, Color4.Blue, Color4.Green, Color4.Red];

    private static FIELD_SIZE: Vector2 = new Vector2(15, 15);
    private static FIELD_OFFSET: Vector2 = new Vector2(10, 10);

    private static PREDICTION_SIZE: Vector2 = new Vector2(3, 2);
    private static PREDICTION_OFFSET: Vector2 = new Vector2(10, 10);

    private game: Game;

    private cubes: Cube[];
    private cubesPrediction: CubePrediction[];

    private cuberPerAppear: number;
    private score: number;

    constructor() {
        super();
    }

    public Init(): void {
        FiveInLIneUI.SetupUI(this.UiComponents);

        this.cubes = [];
        this.cubesPrediction = [];
        this.cuberPerAppear = 1;

        this.game = new Game(800, 1);
        this.game.NextLevelEvent = () => {
            this.cuberPerAppear++;
        };

        this.cubes = [];
        this.cubesPrediction = [];

        this.SetRandomCubesTo();
        this.SetRandomCubePredictionsTo();

        super.Init();
    }

    public RestartGame(): void {

    }

    public NextLevelHandler() {

    }

    public GameOverHandler() {
        this.ShowModal(FiveInLIneUI.GameOverModal);
    }

    public SetRandomCubesTo(): void {
        var freePoints = [];

        for (var i = 0; i < FiveInLIne.FIELD_SIZE.X; i++) {
            for (var j = 0; j < FiveInLIne.FIELD_SIZE.Y; j++) {
                var filedPosition = new Vector2(i, j);
                var cubeOnPos = this.cubes.filter(x => x.FieldPosition == filedPosition)[0];
                if (cubeOnPos == null) {
                    freePoints.push(filedPosition);
                }
            }
        }

        for (var i = 0; i < FiveInLIne.INITIAL_CUBES; i++) {
            this.cubes.push(this.GetNewRandomCube(freePoints, FiveInLIne.FIELD_OFFSET));
        }
    }

    public GetNewRandomCube(freePoints: Vector2[], offset: Vector2): Cube {
        var index = freePoints[Utils.RandI(0, freePoints.length)];
        var filedPostion = new Vector2(index.X, index.Y);
        var newCube = new Cube(
            FiveInLIne.CUDE_SIZE.MUL(filedPostion),
            filedPostion,
            FiveInLIne.CUDE_SIZE,
            FiveInLIne.MOVE_SPEED,
            FiveInLIne.COLORS[Utils.RandI(0, FiveInLIne.COLORS.length)]);

        return newCube;
    }

    public SetRandomCubePredictionsTo() {
        var row = 1;

        for (var i = 0; i < this.cuberPerAppear; i++) {
            var column = i % FiveInLIne.PREDICTION_SIZE.X;

            var newCube = this.GetNewRandomCube([Vector2.Zero], FiveInLIne.PREDICTION_OFFSET);
            var properPosition = FiveInLIne.PREDICTION_OFFSET.ADD(FiveInLIne.CUDE_SIZE.MUL(new Vector2(column, row)));

            this.cubesPrediction.push(
                new CubePrediction(
                    properPosition,
                    newCube.FieldPosition,
                    newCube.Size,
                    newCube.Speed,
                    newCube.Color));
        }
    }

    public ApplyPredictionsToField() {

    }

    //============ UPDATE ============
    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        this.game.Update(timeDelta);

        this.UpdateField(timeDelta);
        this.UpdatePredictin(timeDelta);
    }

    public UpdateField(timeDelta: number): void {
        for (var cubeKey in this.cubes) {
            this.cubes[cubeKey].Update(timeDelta);
        }
    }

    public UpdatePredictin(timeDelta: number): void {
        for (var cubesPredictionKey in this.cubesPrediction) {
            this.cubesPrediction[cubesPredictionKey].Update(timeDelta);
        }
    }

    //============ DRAW ============
    public Draw(): void {
        this.game.Draw(this.DrawGameMenu);

        super.Draw();

        this.DrawField();
        this.DrawPredictin();
    }

    public DrawGameMenu() {
        Draw.I.TextFill(<TextParams> {
            str: "score: " + this.score,
            position: new Vector2(10, 29),
            color: Color4.Gray,
            fontName: "serif",
            fontSize: 18,
            origin: new Vector2(-1, 0)
        });
    }

    public DrawField(): void {
        for (var cubeKey in this.cubes) {
            this.cubes[cubeKey].Draw();
        }
    }

    public DrawPredictin(): void {
        for (var cubesPredictionKey in this.cubesPrediction) {
            this.cubesPrediction[cubesPredictionKey].Draw();
        }
    }
}
