import { Component } from '@angular/core';
import { Data } from '../ts/app/Setups';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent {
    title = 'TestProject';

    constructor() {
        var setups = new Data();
        Data.I.Core.Run();
    };
}
