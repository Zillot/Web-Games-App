module WGAAppModule {
    'use strict';

    export abstract class WGAGame implements IUpdateable, IDrawable {
        public Buttons: Button[];

        constructor() {
            this.Buttons = [];
        }

        public abstract Init(): void;

        public Dispose(): void {
            for (var buttonKey in this.Buttons) {
                var button = this.Buttons[buttonKey];
                button.Dispose();
            }
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