module WGAAppModule {
    'use strict';

    export type CallbackFunction = () => void;

    export class WGAEventContainer {
        public Handler: CallbackFunction;
        public Name: string;
        public Type: number;
    }
}