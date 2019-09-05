import { Page } from "./Page";
import { Setups } from "../../app/Setups";

export abstract class WGAGame extends Page {
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
        Setups.I.Draw.adjustViewToCamera();
        this.Draw();
        Setups.I.Draw.removeCameraInfuence();

        //draw buttons upper all game interface
        Setups.I.Draw.adjustMenuViewToCamera();
        super.Draw();
        Setups.I.Draw.removeCameraInfuence();
    }
}
