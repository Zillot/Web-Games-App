module WGAAppModule {
    'use strict';

    export type CallbackFunction = () => void;
    export type KeyEventFunction = (code, char) => void;

    export class WGAEventContainer {
        public Handler: KeyEventFunction;
        public Name: string;
        public Type: number;
        public KeyCode: number;
    }
}