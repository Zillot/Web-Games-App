module WGAAppModule {
    'use strict';

    export class EventsTypes {
        static get leftMouseClick(): number {
            return 1;
        }
        static get leftMouseUp(): number {
            return 2;
        }
        static get leftMouseDown(): number {
            return 3;
        }
    }
}