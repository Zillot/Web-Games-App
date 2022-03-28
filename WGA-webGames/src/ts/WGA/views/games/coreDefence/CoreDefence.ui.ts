import { IUiComponent } from "../../../../core/ui/Interfaces/IUiComponent";
import { DefaultUI } from "../Default.ui";
import { Modal } from 'src/ts/core/ui/Modal';

export class CoreDefenceUI {
    public static SetupUI(uiComponents: IUiComponent[]) {
        if (this.gameOverModal == null) {
            throw new Error('gameOverModal is not initialized in ' + this.constructor.name);
        }

        uiComponents.push(this.gameOverModal);
    }

    public static gameOverModal: Modal;
    public static get GameOverModal(): Modal {
        return this.gameOverModal;
    }
    public static CreateGameOverModal(restartButtonHandler: any): Modal {
        if (this.gameOverModal == null) {
            this.gameOverModal = DefaultUI.GameOverModal("Game over", "Core is ruiner, hope you proud of your fail! WORST.GAME.EVER!", restartButtonHandler);
        }

        return this.gameOverModal;
    }
}
