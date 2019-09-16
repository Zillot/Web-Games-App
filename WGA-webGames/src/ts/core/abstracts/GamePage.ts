import { Page } from "./Page";
import { Data } from "../../app/Data";
import { Draw } from '../services/Draw';

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
        Draw.I.adjustViewToCamera();
        this.Draw();
        Draw.I.removeCameraInfuence();

        //draw buttons upper all game interface
        Draw.I.adjustMenuViewToCamera();
        super.Draw();
        Draw.I.removeCameraInfuence();
    }
}
