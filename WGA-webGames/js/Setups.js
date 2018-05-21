var Setups = /** @class */ (function () {
    function Setups() {
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
    return Setups;
}());
//# sourceMappingURL=Setups.js.map