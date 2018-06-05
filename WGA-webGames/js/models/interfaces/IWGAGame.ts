module WGAAppModelue {
    'use strict';

    export interface IWGAGame extends IUpdateable, IDrawable {
        Init(): void;
    }
}