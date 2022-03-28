import { Draw } from '../services/Draw';

export interface IDrawable {
    Draw(draw: Draw): void;
}
