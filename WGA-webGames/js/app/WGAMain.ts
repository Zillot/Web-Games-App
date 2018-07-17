module WGAAppModule {
    'use strict';

    window.onload = function () {
        var setups = new Setups();
        Setups.I.Core.Run();
    };
}