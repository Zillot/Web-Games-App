module WGAAppModule {
    'use strict';

    export interface IUiComponent {
        Name: string;

        Init();
        Dispose();
        Update(timeDelta: number);
        Draw(): void;
    }
}