import { Draw } from 'src/ts/core/services/Draw';

export interface IWGADrawable {
    Draw(draw: Draw): void;
}
