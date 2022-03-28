import { TextParams } from "../../../core/models/TextParams";
import { MainPageUI } from "./MainPage.ui";
import { Data } from "../../../app/Data";
import { FillRectParams } from "../../../core/models/FillRectParams";
import { Vector2 } from "../../../core/engine/Vector2";
import { Color4 } from "../../../core/engine/Color4";
import { Page } from "../../../core/abstracts/Page";
import { Draw } from 'src/ts/core/services/Draw';

export class MainPage extends Page {
    constructor() {
        super();

        MainPageUI.SetupUI(this.UiComponents);
    } 

    public Draw() {
        Draw.I.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: Data.I.WindowSize, origin: new Vector2(-1, -1), color: Color4.Black.GetTransparent(0.5) });

        Draw.I.TextFill(<TextParams>{ str: 'Web games app', position: new Vector2(Data.I.Center.X, 100), color: Color4.White, fontSize: 50, origin: new Vector2(0) });
        Draw.I.TextFill(<TextParams>{ str: 'Main menu', position: new Vector2(Data.I.Center.X, 150), color: Color4.White, fontSize: 30, origin: new Vector2(0) });

        super.Draw();
    }
}
