module WGAAppModelue {
    'use strict';

    export class Setups {
        public static I: Setups;

        public WindowWidth: number;
        public WindowHeight: number;
        public CanvasName: string;

        public Center: Vector2;

        public Utils: Utils;
        public Draw: Draw;
        public Core: Core;
        public Input: Input;
        public Geometry: Geometry;

        public App: WGAApp;

        constructor() {
            Setups.I = this;

            Setups.I.WindowWidth = window.innerWidth;
            Setups.I.WindowHeight = window.innerHeight;
            Setups.I.CanvasName = "DrawField";
            //-----------

            Setups.I.Center = new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight).DIV(2);

            Setups.I.Utils = new Utils();
            Setups.I.Draw = new Draw();
            Setups.I.Core = new Core();
            Setups.I.Input = new Input();
            Setups.I.Geometry = new Geometry();

            Setups.I.App = new WGAApp();
        }
    }
}