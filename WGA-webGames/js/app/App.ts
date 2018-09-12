module WGAAppModule {
    'use strict';

    export class WGAApp implements IUpdateable, IDrawable {
        private pause: boolean;
        private currentGame: WGAGameContainer;

        constructor() {
            this.pause = true;

            Setups.I.Pages.CreatePage("Main", new MainPage());
            Setups.I.Pages.CreatePage("CameraTest", new CameraTestMenu());

            Setups.I.Pages.CreatePage("ZombieShooter", new ZombieShooter());
            Setups.I.Pages.CreatePage("CoreDefence", new CoreDefence());
            Setups.I.Pages.CreatePage("CastleDeffence", new CastleDefence());

            Setups.I.Pages.InstantNavigateTo("Main");
        }

        public Update(timeDelta: number): void {
            if (this.pause == true) {
                Setups.I.Pages.Update(timeDelta);
            }

            if (this.currentGame != null && this.pause == false) {
                this.currentGame.Game.Update(timeDelta);
            }
        }
        public Draw(): void {
            if (this.pause == true) {
                Setups.I.Draw.adjustMenuViewToCamera();
                Setups.I.Pages.Draw();
                Setups.I.Draw.removeCameraInfuence();
            }

            if (this.currentGame != null && this.pause == false) {
                this.currentGame.Game.DrawGame();
            }
        }
    }
}