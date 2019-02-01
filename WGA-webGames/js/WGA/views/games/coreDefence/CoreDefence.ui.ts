/// <reference path="../../../../core/ui/Button.ts"/>
/// <reference path="../../../../core/engine/Color4.ts"/>
/// <reference path="../../../../core/engine/Vector2.ts"/>
/// <reference path="../../../../app/Setups.ts"/>

module WGAAppModule {
    'use strict';

    export class CoreDefenceUI {
        public static SetupUI(uiComponents: IUiComponent[]) {

        }

        public static get GameOverModal() {
            return DefaultUI.GameOverModal("Game over", "Core is ruiner, hope you proud of your fail! WORST.GAME.EVER!");
        }
    }
}