import { FillRectParams } from "../models/FillRectParams";
import { Vector2 } from "../engine/Vector2";
import { Color4 } from "../engine/Color4";
import { EventsTypes } from "../models/EventsTypes";
import { TextParams } from "../models/TextParams";
import { KeyCodes } from "../models/KeyCodes";
import { Geometry } from '../services/Geometry';
import { Draw } from '../services/Draw';
import { Input } from '../services/Input';
import { BaseUIComponent } from './BaseUIComponent';

export class Button extends BaseUIComponent {
    public name: string;

    protected text: string;
    protected size: Vector2;
    protected backgroundcolor: Color4;
    protected fontColor: Color4;
    protected fontSize: number;

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

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Draw(): void {
        Draw.I.RectFill(<FillRectParams>{ position: this.position.ADD(this.offset), size: this.size, color: this.backgroundcolor.GetTransparent(this.opacity.GetVal()) });
        Draw.I.TextFill(<TextParams>{ str: this.text, position: this.position.ADD(this.offset), color: this.fontColor.GetTransparent(this.opacity.GetVal()), fontSize: this.fontSize });
    }
    //-------------
    public Click(): void {
        if (Geometry.IsPointInRect(Input.I.GetMousePosition(), Geometry.RectFromVectors(this.position.SUB(this.size.DIV(2)), this.size))) {
            if (this.onClick != null) {
                this.onClick();
            }
        }
    }

    public CopyFrom(buttonBody: Button): void {
        if (!buttonBody.backgroundcolor) { buttonBody.backgroundcolor = Color4.White; }
        if (!buttonBody.fontColor) { buttonBody.fontColor = Color4.Black; }
        if (!buttonBody.fontSize) { buttonBody.fontSize = 14; }

        this.Name = buttonBody.name;
        this.text = buttonBody.text;
        this.onClick = buttonBody.onClick;
        this.size = buttonBody.size;
        this.backgroundcolor = buttonBody.backgroundcolor;
        this.fontColor = buttonBody.fontColor;
        this.fontSize = buttonBody.fontSize;
    }

    public static GetButton(buttonBody: any): Button {
        var newButton = new Button(buttonBody.position);
        newButton.CopyFrom(<Button>buttonBody);
        return newButton;
    }
}
