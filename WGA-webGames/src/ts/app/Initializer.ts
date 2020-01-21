import { Data } from "./Data";
import { Core } from "../core/services/Core";
import { Input } from "../core/services/Input";
import { WGAApp } from "./WGAApp";
import { Vector2 } from '../core/engine/Vector2';
import { Camera } from '../core/models/Camera';
import { Draw } from '../core/services/Draw';
import { InjectorHelper } from './InjectorHelper';

export class Initializer {
    public Initialize(): void {
        Data.I.WindowSize = new Vector2(800, 600);
        Data.I.CameraScale = 1;

        var camera = new Camera();
        camera.SetCanvas("DrawField");
        camera.Reset();

        Data.I.Camera = camera;

        var input = InjectorHelper.Injector.get(Input);
        input.Initialize();

        var core = InjectorHelper.Injector.get(Core);
        core.Initialize();

        var wgaApp = InjectorHelper.Injector.get(WGAApp);
        wgaApp.Initialize();

        core.Run();
    }
}
