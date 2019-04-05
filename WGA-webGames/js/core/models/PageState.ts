module WGAAppModule {
    'use strict';

    export enum NavigateMode {
        Undefined = 0,
        Leaving = 1, //start to navigate
        Still = 2, //leaving done, give control to new page
        Entering = 3, //navigation from page
        Navigated = 4 //navigation from page done, wait for new instruction 
    }
}