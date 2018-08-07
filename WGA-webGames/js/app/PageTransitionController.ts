﻿module WGAAppModule {
    'use strict';

    export class PageTransitionController implements IUpdateable, IDrawable {
        private navigateProcess: Value;
        private navigateMode: NavigateMode;

        public constructor() {
            this.navigateMode = NavigateMode.Undefined;
            this.navigateProcess = new Value(0, 5);
        }

        public NavigateToStart(finishEvent: CallbackFunction) {
            this.navigateMode = NavigateMode.Entering;

            this.navigateProcess.GoTo(1, 5, () => {
                this.navigateMode = NavigateMode.Still;
                finishEvent();
            });
        }

        public NavigateFromStart(finishEvent: CallbackFunction) {
            this.navigateMode = NavigateMode.Leaving;

            this.navigateProcess.GoTo(1, 5, () => {
                this.navigateMode = NavigateMode.Navigated;
                finishEvent();
            });
        }

        public Update(timeDelta: number): void {
            this.navigateProcess.Update(timeDelta);
        }

        public Draw(): void {
            var value = this.navigateProcess.GetVal();

            if (this.navigateMode == NavigateMode.Leaving) {
                value = 1 - value;
            }

            if (this.navigateMode == NavigateMode.Navigated) {
                value = 1;
            }

            if (this.navigateMode == NavigateMode.Entering || this.navigateMode == NavigateMode.Leaving || this.navigateMode == NavigateMode.Navigated) {
                Setups.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Setups.I.WindowWidth, Setups.I.WindowHeight), origin: new Vector2(-1, -1), color: Color4.Black().GetTransparent(value) });
            }
        }
    }
}