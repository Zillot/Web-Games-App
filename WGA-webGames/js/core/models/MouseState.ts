module WGAAppModule {
    'use strict';

    export class MouseState {
        static get down(): number {
            return 1;
        }
        static get up(): number {
            return 2;
        }
        static get undefined(): number {
            return 3;
        }
    }
}