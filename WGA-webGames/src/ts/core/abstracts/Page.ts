import { IDrawable } from "../interfaces/IDrawable";
import { IUpdateable } from "../interfaces/IUpdateable";
import { Modal } from "../ui/Modal";
import { IUiComponent } from "../ui/Interfaces/IUiComponent";

export class Page implements IUpdateable, IDrawable {
    public Modals: Modal[];
    public UiComponents: IUiComponent[];

    public constructor() {
        this.UiComponents = [];
    }

    public Init(): void {
        for (var uiComponent in this.UiComponents) {
            this.UiComponents[uiComponent].Init();
        }
    }

    public Dispose(): void {
        for (var uiComponent in this.UiComponents) {
            this.UiComponents[uiComponent].Dispose();
        }
    }
        
    public Update(timeDelta: number): void {
        for (var uiComponent in this.UiComponents) {
            this.UiComponents[uiComponent].Update(timeDelta);
        }
    }

    public Draw(): void {
        for (var uiComponent in this.UiComponents) {
            this.UiComponents[uiComponent].Draw();
        }
    }

    public ShowModal(modal: Modal) {
        modal.Init();
        this.UiComponents.push(modal);
        modal.Show();
    }
}
