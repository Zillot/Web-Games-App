﻿import { Vector2 } from "../core/engine/Vector2";
import { Draw } from "../core/services/Draw";
import { Utils } from "../core/services/Utils";
import { ExDraw } from "../core/services/ExDraw";
import { Core } from "../core/services/Core";
import { Input } from "../core/services/Input";
import { Geometry } from "../core/services/Geometry";
import { Pages } from "../core/services/Pages";
import { WGAApp } from "./App";

export class Setups {
    public static I: Setups;

    public WindowWidth: number;
    public WindowHeight: number;
    public RealWindowWidth: number;
    public RealWindowHeight: number;

    public FrameScale: number;
    public BackFrameScale: number;

    public FramesCanvasName: string;
    public WorkingDrawCanvasName: string;

    public Center: Vector2;
    public RealCenter: Vector2;

    public FrameOffset: Vector2;
    public FrameRealOffset: Vector2;

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
        Setups.I = this;

        Setups.I.WindowWidth = 800;
        Setups.I.WindowHeight = 600;

        this.RecalculateWindowsSize();

        window.onresize = (event) => {
            this.RecalculateWindowsSize();
        };

        Setups.I.FramesCanvasName = "DrawField";
        Setups.I.WorkingDrawCanvasName = "WorkingDraw";
            
        //-----------

        Setups.I.Center = new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight).DIV(2);
        Setups.I.RealCenter = new Vector2(Setups.I.RealWindowWidth, Setups.I.RealWindowHeight).DIV(2);

        Setups.I.Utils = new Utils();
        Setups.I.Draw = new Draw();
        Setups.I.ExDraw = new ExDraw();
        Setups.I.Core = new Core();
        Setups.I.Input = new Input();
        Setups.I.Geometry = new Geometry();
        Setups.I.Pages = new Pages();

        Setups.I.App = new WGAApp();
    }

    public RecalculateWindowsSize() {
        Setups.I.RealWindowWidth = window.innerWidth;
        Setups.I.RealWindowHeight = window.innerHeight;

        var sw = Setups.I.RealWindowWidth / Setups.I.WindowWidth;
        var sh = Setups.I.RealWindowHeight / Setups.I.WindowHeight;
        Setups.I.FrameScale = Math.min(sw, sh);

        var bsw = Setups.I.WindowWidth / Setups.I.RealWindowWidth;
        var bsh = Setups.I.WindowHeight / Setups.I.RealWindowHeight;
        Setups.I.BackFrameScale = Math.max(bsw, bsh);

        var tx = (Setups.I.RealWindowWidth - (Setups.I.WindowWidth * Setups.I.FrameScale)) / 2;
        var ty = (Setups.I.RealWindowHeight - (Setups.I.WindowHeight * Setups.I.FrameScale)) / 2;
        Setups.I.FrameRealOffset = new Vector2(tx, ty);
        Setups.I.FrameOffset = Setups.I.FrameRealOffset.MUL(Setups.I.FrameScale); 
    }
}
