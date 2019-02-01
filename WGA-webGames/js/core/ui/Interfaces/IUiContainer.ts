module WGAAppModule {
    'use strict';

    export class IUiContainer implements IUiComponent {
        public Name: string;
        private uiComponents: IUiComponent[];

        constructor() {
            this.uiComponents = [];
        }

        public AddUiComponent(newUiComponent: IUiComponent) {
            this.uiComponents.push(newUiComponent);
        }

        public Init(): void {
            for (var uiComponentKey in this.uiComponents) {
                this.uiComponents[uiComponentKey].Init();
            }
        }

        public Dispose(): void {
            for (var uiComponentKey in this.uiComponents) {
                this.uiComponents[uiComponentKey].Dispose();
            }
        }

        public Update(timeDelta: number): void {
            for (var uiComponentKey in this.uiComponents) {
                var uiComponent = this.uiComponents[uiComponentKey];

                uiComponent.Update(timeDelta);
            }
        }

        public Draw(): void {
            //TODO: camera for relative ui components
            for (var uiComponentKey in this.uiComponents) {
                var uiComponent = this.uiComponents[uiComponentKey];

                uiComponent.Draw();
            }
        }
    }
}