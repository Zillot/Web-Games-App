import { Page } from "./Page";
import { Data } from "../../app/Data";

export abstract class GamePage extends Page {
    constructor() {
        super();
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
        Data.I.Draw.adjustViewToCamera();
        this.Draw();
        Data.I.Draw.removeCameraInfuence();

        //draw buttons upper all game interface
        Data.I.Draw.adjustMenuViewToCamera();
        super.Draw();
        Data.I.Draw.removeCameraInfuence();
    }
}
