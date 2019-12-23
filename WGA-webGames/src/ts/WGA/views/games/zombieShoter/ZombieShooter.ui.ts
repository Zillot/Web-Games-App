import { IUiComponent } from "../../../../core/ui/Interfaces/IUiComponent";
import { DefaultUI } from "../Default.ui";
import { Modal } from 'src/ts/core/ui/Modal';
import { Button } from 'src/ts/core/ui/Button';
import { Vector2 } from 'src/ts/core/engine/Vector2';
import { Data } from 'src/ts/app/Data';
import { Color4 } from 'src/ts/core/engine/Color4';

export class ZombieShooterUI {
    public static SetupUI(uiComponents: IUiComponent[]) {
        if (this.gameOverModal == null) {
            throw new Error('gameOverModal is not initialized in ' + this.constructor.name);
        }

        uiComponents.push(ZombieShooterUI.BuyNextLevelBtn);
        uiComponents.push(ZombieShooterUI.GameOverModal);
    }

    private static gameOverModal: Modal;
    public static get GameOverModal(): Modal {
        return this.gameOverModal;
    }
    public static CreateGameOverModal(restartButtonHandler: any): Modal {
        if (this.gameOverModal == null) {
            this.gameOverModal = DefaultUI.GameOverModal("Game over", "You have failed humanity, well done!", restartButtonHandler);
        }

        return this.gameOverModal;
    }

    private static buyNextLevelBtn: Button;
    public static get BuyNextLevelBtn() {
        if (this.buyNextLevelBtn == null) {
            this.buyNextLevelBtn = Button.GetButton({
                name: "BuyNextLevelBtn",
                text: "Level+",
                position: new Vector2(Data.I.Center.X - 100, -50),
                size: new Vector2(40, 40),
                backgroundcolor: Color4.Red
            });
        }

        return this.buyNextLevelBtn;
    }
}
