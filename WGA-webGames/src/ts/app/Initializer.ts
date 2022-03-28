import { Data } from "./Data";
import { Draw } from "../core/services/Draw";
import { Core } from "../core/services/Core";
import { Input } from "../core/services/Input";
import { WGAApp } from "./WGAApp";
import { Vector2 } from '../core/engine/Vector2';

export class Initializer {
    public Initialize(): void {
        Data.I.WindowSize = new Vector2(800, 600);
        Data.I.CameraScale = 1;

        Draw.I.SetMainCanvas("DrawField");

        Draw.I.ResetCamera();
        Input.I.Initialize();
        Core.I.Initialize();
        WGAApp.I.Initialize();

        Core.I.Run();
    }
}
