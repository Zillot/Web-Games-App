import { Vector2 } from "../engine/Vector2";
import { Data } from "../../app/Data";
import { FillRectParams } from "../models/FillRectParams";
import { Color4 } from "../engine/Color4";
import { Draw } from '../services/Draw';
import { BaseUIContainer } from './BaseUIContainer';

export class Modal extends BaseUIContainer {
    private modalName: string;
    private header: string;
    private text: string;

    private size: Vector2;

    constructor(modalName: string, header: string, text: string) {
        super();

        this.position = Data.I.Center;
        this.size = Data.I.WindowSize;

        this.modalName = modalName;
        this.header = header;
        this.text = text;

        this.opacity.SetValue(0);
    }

    public Init() {
        //modal should not be initialized as all components
    }

    public InitModal() {
        super.Init();
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Show() {
        this.opacity.GoTo(1);
    }

    public SetOpacity() {
        //modal should not be influence by opacity of parent
    }

    public Hide(forced: boolean) {
        if (forced) {
            this.opacity.SetValue(0);
        }
        else {
            this.opacity.GoTo(0);
        }
    }

    public Draw(): void {
        Draw.I.RectFill(<FillRectParams>{ position: this.position, size: this.size, color: new Color4(229, 229, 229, this.opacity.GetVal()) });

        super.Draw();
    }
}
