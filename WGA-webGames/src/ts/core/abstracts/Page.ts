import { IDrawable } from "../interfaces/IDrawable";
import { IUpdateable } from "../interfaces/IUpdateable";
import { Modal } from "../ui/Modal";
import { BaseUIContainer } from '../ui/BaseUIContainer';

export class Page extends BaseUIContainer implements IUpdateable, IDrawable {

    public constructor() {
        super();
    }

    public Init(): void {
        super.Init();
    }

    public Dispose(): void {
        super.Dispose();
    }
        
    public Update(timeDelta: number): void {
        super.Update(timeDelta);
    }

    public Draw(): void {
        super.Draw();
    }

    public ShowModal(modal: Modal) {
        modal.InitModal();
        modal.Show();
    }

    public HideAllModals(forced: boolean) {
        for (var uiComponent in this.UiComponents) {
            var component = this.UiComponents[uiComponent];

            if (component instanceof Modal) {
                var modal = component as Modal;

                modal.Hide(forced);
                modal.Dispose();
            }
        }
    }
}
