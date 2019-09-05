import { IUiComponent } from "../../../../core/ui/Interfaces/IUiComponent";
import { DefaultUI } from "../Default.ui";

export class CoreDefenceUI {
    public static SetupUI(uiComponents: IUiComponent[]) {

    }

    public static get GameOverModal() {
        return DefaultUI.GameOverModal("Game over", "Core is ruiner, hope you proud of your fail! WORST.GAME.EVER!");
    }
}
