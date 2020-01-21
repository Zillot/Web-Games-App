import { TransitionValue } from '../../engine/Value';
import { Draw } from '../../services/Draw';

export interface IUiComponent {
    Name: string;

    Init(): void;
    Dispose(): void;
    Update(timeDelta: number): void;
    Draw(draw: Draw): void;
}
