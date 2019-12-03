import { FillRectParams } from "../models/FillRectParams";
import { IUiComponent } from "./Interfaces/IUiComponent";
import { Vector2 } from "../engine/Vector2";
import { Color4 } from "../engine/Color4";
import { EventsTypes } from "../models/EventsTypes";
import { TextParams } from "../models/TextParams";
import { KeyCodes } from "../models/KeyCodes";
import { Rect } from "../engine/Rect";
import { Geometry } from '../services/Geometry';
import { Draw } from '../services/Draw';
import { Input } from '../services/Input';
import { BaseUIComponent } from './BaseUIComponent';

export class Button extends BaseUIComponent {
    public Name: string;

    private text: string;
    private onClick: any;
    private size: Vector2;
    private color: Color4;
    private fontSize: number;

    constructor(position: Vector2) {
        super(position);
    }

    public Init(): void {
        Input.I.OnInputEvent(() => {
                this.Click();
            },
            this.Name + '-OnClick',
            EventsTypes.MouseButtonPressed,
            KeyCodes.LeftMouseClick);
    }

    public Dispose(): void {
        Input.I.RemoveHandler(this.Name + '-OnClick', EventsTypes.MouseButtonPressed);
    }

    public SetOnClick(onClick: any) {
        this.onClick = onClick;
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Draw(): void {
        Draw.I.RectFill(<FillRectParams>{ position: this.position, size: this.size.ADD(new Vector2(3)), color: Color4.Black.GetTransparent(this.opacity.GetVal()), });
        Draw.I.RectFill(<FillRectParams>{ position: this.position, size: this.size, color: this.color.GetTransparent(this.opacity.GetVal()) });
        Draw.I.TextFill(<TextParams>{ str: this.text, position: this.position, color: Color4.Black.GetTransparent(this.opacity.GetVal()), fontSize: 14 });
    }
    //-------------
    public Click(): void {
        if (Geometry.IsPointInRect(Input.I.GetMousePosition(), Rect.FromVectors(this.position.SUB(this.size.DIV(2)), this.size))) {
            if (this.onClick != null) {
                this.onClick();
            }
        }
    }

    public static GetButton(buttonBody: any): Button {
        var newButton = new Button(null);
        newButton.Name = buttonBody.name;
        newButton.text = buttonBody.text;
        newButton.onClick = buttonBody.onClick;
        newButton.position = buttonBody.position;
        newButton.size = buttonBody.size;
        newButton.color = buttonBody.color;
        newButton.fontSize = buttonBody.fontSize;

        return newButton;
    }
}
