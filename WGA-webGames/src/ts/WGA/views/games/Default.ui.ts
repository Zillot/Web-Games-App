import { IUiComponent } from "../../../core/ui/Interfaces/IUiComponent";
import { Button } from "../../../core/ui/Button";
import { Vector2 } from "../../../core/engine/Vector2";
import { Data } from "../../../app/Setups";
import { Color4 } from "../../../core/engine/Color4";
import { Modal } from "../../../core/ui/Modal";

export class DefaultUI {
    public static SetupUI(uiComponents: IUiComponent[]) {

    }

    private static toMainButton: Button;
    public static get ToMainButton() {
        if (this.toMainButton == null) {
            this.toMainButton = Button.GetButton({
                name: "ToMainButton",
                text: "I am quit",
                onClick: function () {
                    Data.I.Pages.NavigateTo("Main");
                },
                position: new Vector2(Data.I.Center.X / 2 - 65, Data.I.Center.Y / 2 + 200),
                size: new Vector2(120, 40),
                color: Color4.White
            });
        }

        return this.toMainButton;
    }

    private static restartButton: Button;
    public static get RestartButton() {
        if (this.restartButton == null) {
            this.restartButton = Button.GetButton({
                name: "RestartButton",
                text: "One more try",
                position: new Vector2(Data.I.Center.X / 2 + 65, Data.I.Center.Y / 2 + 200),
                size: new Vector2(120, 40),
                color: Color4.White
            });
        }

        return this.restartButton;
    }

    private static gameOverModal: Modal;
    public static GameOverModal(header: string, test: string) {
        if (this.gameOverModal == null) {
            this.gameOverModal = new Modal("GameOver", header, test);

            this.gameOverModal.AddUiComponent(this.RestartButton);
            this.gameOverModal.AddUiComponent(this.ToMainButton);
        }

        return this.gameOverModal;
    }
}
