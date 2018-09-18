module WGAAppModule {
    'use strict';

    export class Modal {
        private name: string;
        private header: string;
        private text: string;
        private uiComponents: IUiComponent[];

        private position: Vector2;
        private size: Vector2;

        constructor(name: string, header: string, text: string) {
            this.position = Setups.I.Center.SUB(new Vector2(100, 70));
            this.size = new Vector2(200, 140);

            this.name = name;
            this.header = header;
            this.text = text;

            this.uiComponents = [];
        }

        public Init(): void {

        }

        public Dispose(): void {

        }

        public Update(timeDelta: number): void {
            for (var uiComponentKey in this.uiComponents) {
                var uiComponent = this.uiComponents[uiComponentKey];

                uiComponent.Update(timeDelta);
            }
        }

        public Draw(): void {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: this.position, size: this.size, color: new Color4(229, 229, 229, 1) });

            //TODO: camera for relative ui components
            for (var uiComponentKey in this.uiComponents) {
                var uiComponent = this.uiComponents[uiComponentKey];

                uiComponent.Draw();
            }
        }
    }
}