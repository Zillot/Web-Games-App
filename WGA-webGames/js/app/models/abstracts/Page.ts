module WGAAppModule {
    'use strict';

    export class Page implements IUpdateable, IDrawable {
        public Buttons: Button[];

        public constructor() {
            this.Buttons = [];
        }

        public Dispose(): void {
            for (var buttonKey in this.Buttons) {
                var button = this.Buttons[buttonKey];
                button.Dispose();
            }
        }

        public Init(): void {

        }

        public Update(timeDelta: number): void {
            for (var buttonKey in this.Buttons) {
                var button = this.Buttons[buttonKey];
                button.Update(timeDelta);
            }
        }

        public Draw(): void {
            for (var buttonKey in this.Buttons) {
                var button = this.Buttons[buttonKey];
                button.Draw();
            }
        }
    }
}