import { DefaultUI } from "../Default.ui";
import { IUiComponent } from "../../../../core/ui/Interfaces/IUiComponent";
import { Modal } from 'src/ts/core/ui/Modal';

export class FiveInLIneUI {
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
            this.gameOverModal = DefaultUI.GameOverModal("Game over", "Not bad for blind man! But if you not blind, well, you should be.", restartButtonHandler);
        }

        return this.gameOverModal;
    }
}
