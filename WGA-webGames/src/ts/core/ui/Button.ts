import { FillRectParams } from "../models/FillRectParams";
import { IUiComponent } from "./Interfaces/IUiComponent";
import { Vector2 } from "../engine/Vector2";
import { Color4 } from "../engine/Color4";
import { Data } from "../../app/Data";
import { EventsTypes } from "../models/EventsTypes";
import { TextParams } from "../models/TextParams";
import { KeyCodes } from "../models/KeyCodes";
import { Rect } from "../engine/Rect";

export class Button implements IUiComponent {
    public Name: string;

    private text: string;
    private onClick: any;
    private position: Vector2;
    private size: Vector2;
    private color: Color4;
    private fontSize: number;

    constructor() {
    }

    public Init(): void {
        Data.I.Input.OnInputEvent(() => {
                this.Click();
            },
            this.Name + '-OnClick',
            EventsTypes.MouseButtonPressed,
            KeyCodes.LeftMouseClick);
    }

    public Dispose(): void {
        Data.I.Input.RemoveHandler(this.Name + '-OnClick', EventsTypes.MouseButtonPressed);
    }

    public SetOnClick(onClick: any) {
        this.onClick = onClick;
    }

    public Update(timeDelta: number): void {

    }

    public Draw(): void {
        Data.I.Draw.RectFill(<FillRectParams>{ position: this.position, size: this.size.ADD(new Vector2(3)), color: Color4.Black });
        Data.I.Draw.RectFill(<FillRectParams>{ position: this.position, size: this.size, color: this.color });
        Data.I.Draw.TextFill(<TextParams>{ str: this.text, position: this.position, color: Color4.Black, fontSize: 14 });
    }
    //-------------
    public Click(): void {
        if (Data.I.Geometry.IsPointInRect(Data.I.Input.GetMousePosition(), Rect.FromVectors(this.position.SUB(this.size.DIV(2)), this.size))) {
            if (this.onClick != null) {
                this.onClick();
            }
        }
    }

    public static GetButton(buttonBody: any): Button {
        var newButton = new Button();
        newButton.Name = buttonBody.name;
        newButton.text = buttonBody.text;
        newButton.onClick = buttonBody.onClick;
        newButton.position = buttonBody.position;
        newButton.size = buttonBody.size;
        newButton.color = buttonBody.color;
        newButton.fontSize = buttonBody.fontSize;

        newButton.Init();

        return newButton;
    }
}
