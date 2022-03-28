import { Draw } from '../../services/Draw';
import { MouseInput } from '../../services/MouseInput';
import { KeyboardInput } from '../../services/KeyboardInput';

export interface IUiComponent {
    Name: string;

    Init(mouseInput: MouseInput, keyboardInput: KeyboardInput): void;
    Dispose(): void;
    Update(timeDelta: number): void;
    Draw(draw: Draw): void;
}
