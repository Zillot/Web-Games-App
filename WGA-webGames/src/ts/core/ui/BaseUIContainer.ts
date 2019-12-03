import { Vector2 } from '../engine/Vector2';
import { BaseUIComponent } from './BaseUIComponent';

export class BaseUIContainer extends BaseUIComponent {
    public UiComponents: BaseUIComponent[];

    constructor() {
        super(new Vector2(0, 0));

        this.UiComponents = [];
    }

    public AddUiComponent(newUiComponent: BaseUIComponent) {
        newUiComponent.SetOpacity(this.opacity.GetVal());
        this.UiComponents.push(newUiComponent);
    }

    public Init(): void {
        for (var uiComponentKey in this.UiComponents) {
            this.UiComponents[uiComponentKey].Init();
        }
    }

    public Dispose(): void {
        for (var uiComponentKey in this.UiComponents) {
            this.UiComponents[uiComponentKey].Dispose();
        }
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        for (var uiComponentKey in this.UiComponents) {
            var uiComponent = this.UiComponents[uiComponentKey];

            uiComponent.SetOpacity(this.opacity.GetVal());
            uiComponent.Update(timeDelta);
        }
    }

    public Draw(): void {
        //TODO: camera for relative ui components
        for (var uiComponentKey in this.UiComponents) {
            var uiComponent = this.UiComponents[uiComponentKey];

            uiComponent.Draw();
        }
    }
}
