import { IUiContainer } from "./Interfaces/IUiContainer";
import { Vector2 } from "../engine/Vector2";
import { Value } from "../engine/Value";
import { Data } from "../../app/Data";
import { FillRectParams } from "../models/FillRectParams";
import { Color4 } from "../engine/Color4";
import { Draw } from '../services/Draw';

export class Modal extends IUiContainer {
    private modalName: string;
    private header: string;
    private text: string;

    private position: Vector2;
    private size: Vector2;

    private showProcess: Value;

    constructor(modalName: string, header: string, text: string) {
        super();

        this.position = Data.I.Center;
        this.size = Data.I.WindowSize;

        this.modalName = modalName;
        this.header = header;
        this.text = text;

        this.showProcess = new Value(0, 1);
    }

    public Update(timeDelta: number): void {
        this.showProcess.Update(timeDelta);

        super.Update(timeDelta);
    }

    public Show() {
        this.showProcess.GoTo(1);
    }

    public Draw(): void {
        Draw.I.RectFill(<FillRectParams>{ position: this.position, size: this.size, color: new Color4(229, 229, 229, this.showProcess.GetVal()) });

        super.Draw();
    }
}
