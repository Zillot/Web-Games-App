module WGAAppModule {
    'use strict';

    export interface IUpdateable {
        Update(timeDelta: number): void;
    }
}