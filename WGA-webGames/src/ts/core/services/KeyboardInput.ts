import { Injectable } from '@angular/core';
import { EventsTypes } from "../models/EventsTypes";
import { Events } from './Events';

import * as $ from 'jquery';

@Injectable()
export class KeyboardInput {
    public static I: KeyboardInput;
    public static _initialize = (() => {
        KeyboardInput.I = new KeyboardInput(null);
    })();

    private _events: Events;

    public constructor(events: Events) {
        this._events = events;
    }

    public Initialize() {
        $(document).keydown((e: any) => {
            this._events.EventThrow(EventsTypes.KeyboardKeyPressed, e.key, e.char);
        });
    }

    public GetKeyCodeOfChar(char: string) {
        if (char.length != 1) {
            throw "KeyboardInput service error, length of char should only be 1 char";
        }

        var code = char.charCodeAt(0);

        if (code >= 48 && code <= 57) {
            return code;
        }

        if (code >= 97 && code <= 122) {
            return code - 32;
        }

        return -1;
    }
}
