import { DefaultUI } from "../Default.ui";
import { IUiComponent } from "../../../../core/ui/Interfaces/IUiComponent";

export class FiveInLIneUI {
    public static SetupUI(uiComponents: IUiComponent[]) {

    }

    public static get GameOverModal() {
        return DefaultUI.GameOverModal("Game over", "Not bad! For blind man");
    }
}
