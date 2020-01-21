import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Core } from 'src/ts/core/services/Core';
import { Draw } from 'src/ts/core/services/Draw';
import { Game } from 'src/ts/core/services/Game';
import { Geometry } from 'src/ts/core/services/Geometry';
import { Input } from 'src/ts/core/services/Input';
import { Pages } from 'src/ts/core/services/Pages';
import { Utils } from 'src/ts/core/services/Utils';

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
        Input,
        Pages,
        Utils
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
