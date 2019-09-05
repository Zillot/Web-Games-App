import { IUiComponent } from "../../../../core/ui/Interfaces/IUiComponent";
import { DefaultUI } from "../Default.ui";

export class ZombieShooterUI {
    public static SetupUI(uiComponents: IUiComponent[]) {

    }

    public static get GameOverModal() {
        return DefaultUI.GameOverModal("Game over", "You have failed humanity, well done!");
    }
}
