import { IUiComponent } from "../../../core/ui/Interfaces/IUiComponent";
import { Button } from "../../../core/ui/Button";
import { Vector2 } from "../../../core/engine/Vector2";
import { Data } from "../../../app/Data";
import { Color4 } from "../../../core/engine/Color4";
import { Modal } from "../../../core/ui/Modal";
import { Pages } from 'src/ts/core/services/Pages';

export class DefaultUI {
    public static SetupUI(uiComponents: IUiComponent[]) {

    }

    private static gameOverModal: Modal;
    public static GameOverModal(header: string, test: string, restartButtonHandler?: any) {
        this.gameOverModal = new Modal("GameOver", header, test);

        var restartButton = Button.GetButton({
            name: "RestartButton",
            text: "One more try",
            position: new Vector2(Data.I.Center.X + 65, Data.I.Center.Y + 200),
            size: new Vector2(120, 40),
            color: Color4.White
        });

        var toMainButton = Button.GetButton({
            name: "ToMainButton",
            text: "I am quit",
            onClick: function () {
                Pages.I.NavigateTo("Main");
            },
            position: new Vector2(Data.I.Center.X - 65, Data.I.Center.Y + 200),
            size: new Vector2(120, 40),
            color: Color4.White
        });

        restartButton.SetOnClick(restartButtonHandler);
        this.gameOverModal.AddUiComponent(restartButton);
        this.gameOverModal.AddUiComponent(toMainButton);

        return this.gameOverModal;
    }
}
