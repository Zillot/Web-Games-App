import { Vector2 } from "../core/engine/Vector2";
import { Draw } from "../core/services/Draw";
import { Utils } from "../core/services/Utils";
import { ExDraw } from "../core/services/ExDraw";
import { Core } from "../core/services/Core";
import { Input } from "../core/services/Input";
import { Geometry } from "../core/services/Geometry";
import { Pages } from "../core/services/Pages";
import { WGAApp } from "./App";

export class Data {
    public static I: Data;

    public CanvasWidth: number;
    public CanvasHeight: number;
    public WindowWidth: number;
    public WindowHeight: number;
    public RealWindowWidth: number;
    public RealWindowHeight: number;

    public CameraScale: number;
    public FrameScale: number;
    public BackFrameScale: number;

    public FramesCanvasName: string;
    public WorkingDrawCanvasName: string;

    public Center: Vector2;
    public RealCenter: Vector2;

    public FrameRealOffset: Vector2;
    public FrameOffset: Vector2;

    //services
    public Utils: Utils;
    public Draw: Draw;
    public ExDraw: ExDraw;
    public Core: Core;
    public Input: Input;
    public Geometry: Geometry;
    public Pages: Pages;

    public App: WGAApp;

    constructor() {
        Data.I = this;

        Data.I.WindowWidth = 800;
        Data.I.WindowHeight = 600;
        Data.I.CameraScale = 1;

        Data.I.FramesCanvasName = "DrawField";
        Data.I.WorkingDrawCanvasName = "WorkingDraw";

        //-----------
        Data.I.Utils = new Utils();
        Data.I.Draw = new Draw();
        Data.I.ExDraw = new ExDraw();
        Data.I.Core = new Core();
        Data.I.Input = new Input();
        Data.I.Geometry = new Geometry();
        Data.I.Pages = new Pages();

        Data.I.App = new WGAApp();
    }

}
