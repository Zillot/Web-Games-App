module WGAAppModule {
    'use strict';

    export class Modal implements IUiComponent {
        public Name: string;

        private modalName: string;
        private header: string;
        private text: string;
        private uiComponents: IUiComponent[];

        private position: Vector2;
        private size: Vector2;

        private showProcess: Value;

        constructor(modalName: string, header: string, text: string) {
            this.position = Setups.I.Center.SUB(new Vector2(100, 70));
            this.size = new Vector2(200, 140);

            this.modalName = modalName;
            this.header = header;
            this.text = text;

            this.uiComponents = [];

            this.showProcess = new Value(0, 1);
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
            this.showProcess.Update(timeDelta);

            for (var uiComponentKey in this.uiComponents) {
                var uiComponent = this.uiComponents[uiComponentKey];

                uiComponent.Update(timeDelta);
            }
        }

        public Show() {
            this.showProcess.GoTo(1);
        }

        public Draw(): void {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: this.position, size: this.size, color: new Color4(229, 229, 229, this.showProcess.GetVal()) });

            //TODO: camera for relative ui components
            for (var uiComponentKey in this.uiComponents) {
                var uiComponent = this.uiComponents[uiComponentKey];

                uiComponent.Draw();
            }
        }
    }
}