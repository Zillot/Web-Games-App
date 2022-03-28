import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Core } from 'src/ts/core/services/Core';
import { Draw } from 'src/ts/core/services/Draw';
import { Game } from 'src/ts/core/services/Game';
import { Geometry } from 'src/ts/core/services/Geometry';
import { Pages } from 'src/ts/core/services/Pages';
import { Utils } from 'src/ts/core/services/Utils';
import { MouseInput } from 'src/ts/core/services/MouseInput';
import { KeyboardInput } from 'src/ts/core/services/KeyboardInput';
import { Events } from 'src/ts/core/services/Events';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        Core,
        Draw,
        Game,
        Geometry,
        Events,
        KeyboardInput,
        MouseInput,
        Pages,
        Utils
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
