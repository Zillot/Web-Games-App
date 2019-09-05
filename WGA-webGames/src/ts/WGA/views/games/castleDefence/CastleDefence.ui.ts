import { IUiComponent } from "../../../../core/ui/Interfaces/IUiComponent";
import { Button } from "../../../../core/ui/Button";
import { Vector2 } from "../../../../core/engine/Vector2";
import { Color4 } from "../../../../core/engine/Color4";
import { DefaultUI } from "../Default.ui";

export class CastleDefenceUI {
    public static SetupUI(uiComponents: IUiComponent[]) {
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
                color: Color4.White
            });
        }

        return this.buildTower;
    }

    public static get GameOverModal() {
        return DefaultUI.GameOverModal("Game over", "So many servant give their lives, just so you can have fun. Hope you happy now");
    }
}
