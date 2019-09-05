import { IUiContainer } from "./Interfaces/IUiContainer";
import { Vector2 } from "../engine/Vector2";
import { Value } from "../engine/Value";
import { Setups } from "../../app/Setups";
import { FillRectParams } from "../models/FillRectParams";
import { Color4 } from "../engine/Color4";

export class Modal extends IUiContainer {
    private modalName: string;
    private header: string;
    private text: string;

    private position: Vector2;
    private size: Vector2;

    private showProcess: Value;

    constructor(modalName: string, header: string, text: string) {
        super();

        this.position = Setups.I.Center.SUB(new Vector2(100, 70));
        this.size = new Vector2(200, 140);

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
        Setups.I.Draw.RectFill(<FillRectParams>{ position: this.position, size: this.size, color: new Color4(229, 229, 229, this.showProcess.GetVal()) });

        super.Draw();
    }
}
