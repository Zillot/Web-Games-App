module WGAAppModule {
    'use strict';

    export class MainMenu implements IUpdateable, IDrawable {
        public page: Page;

        constructor() {
            this.page = new MainPage();
        }

        public Update(timeDelta: number): void {
            this.page.Update(timeDelta);
        }

        public Draw(): void {
            this.page.Draw();
        }
    }
}