import { Component } from '@angular/core';
import { Setups } from '../ts/app/Setups';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent {
    title = 'TestProject';

    constructor() {
        var setups = new Setups();
        Setups.I.Core.Run();
    };
}
