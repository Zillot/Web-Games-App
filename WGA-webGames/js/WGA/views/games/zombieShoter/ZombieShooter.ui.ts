/// <reference path="../../../../core/ui/Button.ts"/>
/// <reference path="../../../../core/engine/Color4.ts"/>
/// <reference path="../../../../core/engine/Vector2.ts"/>
/// <reference path="../../../../app/Setups.ts"/>

module WGAAppModule {
    'use strict';

    export class ZombieShooterUI {
        private static toMainButton: Button;
        public static get ToMainButton() {
            if (this.toMainButton == null) {
                this.toMainButton = Button.GetButton({
                    name: "ToMainButton",
                    text: "I am quit",
                    position: new Vector2(Setups.I.Center.X / 2 - 65, Setups.I.Center.Y / 2 + 200),
                    size: new Vector2(120, 40),
                    color: Color4.White
                });
            }

            return this.toMainButton;
        }

        private static restartButton: Button;
        public static get RestartButton() {
            if (this.restartButton == null) {
                this.restartButton = Button.GetButton({
                    name: "RestartButton",
                    text: "One more try",
                    position: new Vector2(Setups.I.Center.X / 2 + 65, Setups.I.Center.Y / 2 + 200),
                    size: new Vector2(120, 40),
                    color: Color4.White
                });
            }

            return this.restartButton;
        }

        private static gameOverModal: Modal;
        public static get GameOverModal() {
            if (this.gameOverModal == null) {
                this.gameOverModal = new Modal("GameOver", "Game over", "You have failed humanity, well done!");

                this.gameOverModal.AddUiComponent(this.RestartButton);
                this.gameOverModal.AddUiComponent(this.ToMainButton);
            }

            return this.gameOverModal;
        }
    }
}