import { FillRectParams } from "../models/drawModels/FillRectParams";
import { Vector2 } from "../engine/Vector2";
import { Color4 } from "../engine/Color4";
import { TextParams } from "../models/drawModels/TextParams";
import { Geometry } from '../services/Geometry';
import { Draw } from '../services/Draw';
import { BaseUIComponent } from './BaseUIComponent';
import { MouseInput } from '../services/MouseInput';
import { MouseButtonsOperations } from '../models/MouseButtonsOperations';
import { MouseButtons } from '../models/MouseButtons';

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
        super.Init();

        this.signForRelatedMouseEVents();
    }

    private signForRelatedMouseEVents() {
        var conditionCheck = () => {
            return Geometry.IsPointInRect(MouseInput.GetMousePosition(), Geometry.RectFromVectors(this.position.SUB(this.size.DIV(2)), this.size));
        };

        this._mouseInput.OnMouseEvent(() => {
                this._mouseInput.PreventNextEvent();
                this.Click();
            },
            this.Name + '-OnClick',
            conditionCheck,
            MouseButtons.Left,
            MouseButtonsOperations.Click);

        var defaultBlockedEvents = [MouseButtonsOperations.DoubleClick, MouseButtonsOperations.Down, MouseButtonsOperations.Up];

        for (var mouseButtonKey in MouseButtons) {
            for (var eventToBlockKey in defaultBlockedEvents) {
                var eventToBlock = defaultBlockedEvents[eventToBlockKey];

                this._mouseInput.OnMouseEvent(() => {
                        this._mouseInput.PreventNextEvent();
                    },
                    this.Name + "-" + mouseButtonKey + '-' + eventToBlockKey,
                    conditionCheck,
                    <MouseButtons>mouseButtonKey,
                    eventToBlock);
            }
        }
    }

    public Dispose(): void {
        this._mouseInput.RemoveHandler(this.Name + '-OnClick');
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Draw(draw: Draw): void {
        draw.RectFill(<FillRectParams>{ position: this.position.ADD(this.offset), size: this.size, color: Color4.Black.GetTransparent(this.opacity.GetVal()) });
        draw.RectFill(<FillRectParams>{ position: this.position.ADD(this.offset), size: this.size.SUB(2), color: this.backgroundcolor.GetTransparent(this.opacity.GetVal()) });
        draw.TextFill(<TextParams>{ str: this.text, position: this.position.ADD(this.offset), color: this.fontColor.GetTransparent(this.opacity.GetVal()), fontSize: this.fontSize });
    }
    //-------------
    public Click(): void {
        if (this.onClick != null) {
            this.onClick();
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
