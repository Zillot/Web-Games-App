module WGAAppModule {
    'use strict';

    export class Page implements IUpdateable, IDrawable {
        public Buttons: Button[];
        public Modals: Modal[];

        public constructor() {
            this.Buttons = [];
            this.Modals = [];
        }

        public Init(): void {
            for (var buttonKey in this.Buttons) {
                this.Buttons[buttonKey].Init();
            }
            for (var modalKey in this.Modals) {
                this.Modals[modalKey].Init();
            }
        }

        public Dispose(): void {
            for (var buttonKey in this.Buttons) {
                this.Buttons[buttonKey].Dispose();
            }
            for (var modalKey in this.Modals) {
                this.Modals[modalKey].Dispose();
            }
        }
        
        public Update(timeDelta: number): void {
            for (var buttonKey in this.Buttons) {
                this.Buttons[buttonKey].Update(timeDelta);
            }
            for (var modalKey in this.Modals) {
                this.Modals[modalKey].Update(timeDelta);
            }
        }

        public Draw(): void {
            for (var buttonKey in this.Buttons) {
                this.Buttons[buttonKey].Draw();
            }
            for (var modalKey in this.Modals) {
                this.Modals[modalKey].Draw();
            }
        }

        public ShowModal(modal: Modal) {
            modal.Init();
            this.Modals.push(modal);
            modal.Show();
        }
    }
}