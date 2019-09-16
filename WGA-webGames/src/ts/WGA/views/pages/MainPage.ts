import { TextParams } from "../../../core/models/TextParams";
import { MainPageUI } from "./MainPage.ui";
import { Data } from "../../../app/Data";
import { FillRectParams } from "../../../core/models/FillRectParams";
import { Vector2 } from "../../../core/engine/Vector2";
import { Color4 } from "../../../core/engine/Color4";
import { Page } from "../../../core/abstracts/Page";

export class MainPage extends Page {
    constructor() {
        super();

        MainPageUI.SetupUI(this.UiComponents);
    } 

    public Draw() {
        Data.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Data.I.WindowWidth, Data.I.WindowHeight), origin: new Vector2(-1, -1), color: Color4.Black.GetTransparent(0.5) });

        Data.I.Draw.TextFill(<TextParams>{ str: 'Web games app', position: new Vector2(Data.I.Center.X, 100), color: Color4.White, fontSize: 50, origin: new Vector2(0) });
        Data.I.Draw.TextFill(<TextParams>{ str: 'Main menu', position: new Vector2(Data.I.Center.X, 150), color: Color4.White, fontSize: 30, origin: new Vector2(0) });

        super.Draw();
    }
}
