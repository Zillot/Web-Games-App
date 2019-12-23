import { IUiComponent } from "../../../../core/ui/Interfaces/IUiComponent";
import { Button } from "../../../../core/ui/Button";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { DefaultUI } from "../Default.ui";
import { Modal } from 'src/ts/core/ui/Modal';

export class CastleDefenceUI {
    public static SetupUI(uiComponents: IUiComponent[]) {
        if (this.gameOverModal == null) {
            throw new Error('gameOverModal is not initialized in ' + this.constructor.name);
        }

        uiComponents.push(this.gameOverModal);

        uiComponents.push(CastleDefenceUI.BuildTower);
    }

    private static buildTower: Button;
    public static get BuildTower() {
        if (this.buildTower == null) {
            this.buildTower = Button.GetButton({
                name: "BuildTower",
                text: "B",
                position: new Vector2(20, 20),
                size: new Vector2(40, 40),
                backgroundcolor: Color4.White
            });
        }

        return this.buildTower;
    }

    public static gameOverModal: Modal;
    public static get GameOverModal(): Modal {
        return this.gameOverModal;
    }
    public static CreateGameOverModal(restartButtonHandler: any): Modal {
        if (this.gameOverModal == null) {
            this.gameOverModal = DefaultUI.GameOverModal(
                "Game over",
                "So many servant has given their lives, just so you can have fun and screw everything up. Hope you happy now",
                restartButtonHandler);
        }

        return this.gameOverModal;
    }
}
