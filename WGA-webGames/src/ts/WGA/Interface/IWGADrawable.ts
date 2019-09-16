import { ExDraw } from '../services/ExDraw';

export interface IWGADrawable {
    Draw(edxDraw: ExDraw): void;
}
