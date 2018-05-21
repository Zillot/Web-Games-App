var MainMenu = /** @class */ (function () {
    function MainMenu() {
        this.page = new MainPage();
    }
    MainMenu.prototype.Update = function (timeDelta) {
        this.page.Update(timeDelta);
    };
    MainMenu.prototype.Draw = function (ctx) {
        this.page.Draw(ctx);
    };
    return MainMenu;
}());
//# sourceMappingURL=MainMain.js.map