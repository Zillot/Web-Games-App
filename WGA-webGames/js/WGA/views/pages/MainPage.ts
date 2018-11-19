/// <reference path="../../../core/abstracts/Page.ts"/>

module WGAAppModule {
    'use strict';

    export class MainPage extends Page {
        constructor() {
            super();

            this.UiComponents.push(MainPageUI.SelectGame1Btn);
            this.UiComponents.push(MainPageUI.SelectGame2Btn);
            this.UiComponents.push(MainPageUI.SelectGame3Btn);
            this.UiComponents.push(MainPageUI.EsternEqq1Btn);
            this.UiComponents.push(MainPageUI.CamTestBtn);
            this.UiComponents.push(MainPageUI.CollisionTestBtn);

            this.UiComponents.push(new MainIco(new Vector2(100, 100), 40, 3, 1));
        } 

        public Draw() {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight), origin: new Vector2(-1, -1), color: Color4.Black.GetTransparent(0.5) });

            Setups.I.Draw.TextFill(<TextParams>{ str: 'Web games app', position: new Vector2(Setups.I.Center.X, 100), color: Color4.White, fontSize: 50, origin: new Vector2(0) });
            Setups.I.Draw.TextFill(<TextParams>{ str: 'Main menu', position: new Vector2(Setups.I.Center.X, 150), color: Color4.White, fontSize: 30, origin: new Vector2(0) });

            super.Draw();
        }
    }
}