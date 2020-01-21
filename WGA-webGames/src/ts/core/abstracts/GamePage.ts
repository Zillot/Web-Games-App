import { Page } from "./Page";
import { Data } from "../../app/Data";
import { Draw } from '../services/Draw';

export abstract class GamePage extends Page {
    constructor(draw: Draw) {
        super(draw);
    }

    public Init(): void {
        super.Init();
    }

    public RestartGame(): void {

    }

    public Dispose(): void {
        super.Dispose();
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public DrawGame() {
        Data.I.Camera.AdjustViewToCamera();
        this.Draw();
        Data.I.Camera.RemoveCameraInfuence();

        //draw buttons upper all game interface
        Data.I.Camera.AdjustMenuViewToCamera();
        super.Draw();
        Data.I.Camera.RemoveCameraInfuence();
    }
}
