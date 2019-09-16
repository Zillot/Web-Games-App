import { Component } from '@angular/core';
import { Data } from '../ts/app/Data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent {
    title = 'TestProject';

    constructor() {
        var data = new Data();
        Data.I.Core.Run();
    };
}
