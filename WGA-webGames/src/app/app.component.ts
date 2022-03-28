import { Component } from '@angular/core';
import { Initializer } from 'src/ts/app/Initializer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent {
    title = 'TestProject';

    constructor() {
        var initializer = new Initializer();
        initializer.Initialize();
    };
}
