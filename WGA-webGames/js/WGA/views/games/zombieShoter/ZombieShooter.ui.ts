/// <reference path="../../../../core/ui/Button.ts"/>
/// <reference path="../../../../core/engine/Color4.ts"/>
/// <reference path="../../../../core/engine/Vector2.ts"/>
/// <reference path="../../../../app/Setups.ts"/>

module WGAAppModule {
    'use strict';

    export class ZombieShooterUI {
        public static SetupUI(uiComponents: IUiComponent[]) {

        }

        public static get GameOverModal() {
            return DefaultUI.GameOverModal("Game over", "You have failed humanity, well done!");
        }
    }
}