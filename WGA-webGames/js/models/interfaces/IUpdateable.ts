module WGAAppModelue {
    'use strict';

    export interface IUpdateable {
        Update(timeDelta: number): void;
    }
}