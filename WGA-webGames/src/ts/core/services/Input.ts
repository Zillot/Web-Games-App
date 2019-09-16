import { WGAEventContainer } from "../../WGA/WGAEventContainer";
import { Data } from "../../app/Data";
import { Vector2 } from "../engine/Vector2";
import { MouseState } from "../models/MouseState";
import { EventsTypes } from "../models/EventsTypes";
import { KeyCodes } from "../models/KeyCodes";

import * as $ from 'jquery';

export class Input {
    private mousePos: Vector2;
    private mouseDown: number;

    private eventsHandlers: WGAEventContainer[];
    private enableEvent: boolean;

    constructor() {
        this.mousePos = new Vector2();
        this.eventsHandlers = [];

        this.mouseDown = 0;

        var canvas = document.getElementById(Data.I.FramesCanvasName);
        document.body.onmousedown = () => this.MouseDownFun(this);
        document.body.onmouseup = () => this.MouseUpFun(this);
        canvas.addEventListener('mousemove', evt => this.MouseMoveFun(this, canvas, evt), false);

        $(document).keydown((e: any) => {
            this.EventThrow(EventsTypes.KeyboardKeyPressed, e.key, e.char);
        });
    }

    public GetKeyCodeOfChar(char: string) {
        if (char.length != 1) {
            throw "input service error, length of char should only be 1 char";
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

    public MouseDownFun(those: Input): void {
        those.mouseDown++;
        if (those.mouseDown > 1) {
            those.mouseDown = 1;
        }

        those.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseDown, null);
    }
    public MouseUpFun(those: Input): void {
        those.mouseDown--;
        if (those.mouseDown < 0) {
            those.mouseDown = 0;
        }

        this.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseUp, null);
        this.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseClick, null);
    }
    public MouseMoveFun(those: Input, canvas: any, evt: any): void {
        var rect = canvas.getBoundingClientRect();
        those.mousePos = new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
    }

    public GetMouseState(): number {
        if (this.mouseDown == 0) {
            return MouseState.Up;
        }
        else if (this.mouseDown == 1) {
            return MouseState.Down;
        }
        else {
            return MouseState.Undefined;
        }
    }
    public PreventHandlers(): void {
        this.enableEvent = false;
    }
    public EventThrow(typeId: number, keyCode: number, keyChar: string): void {
        this.enableEvent = true;

        for (var eventKey in this.eventsHandlers) {
            var event = this.eventsHandlers[eventKey];

            try {
                if (this.enableEvent && event.Type == typeId && (event.KeyCode == null || event.KeyCode == keyCode)) {
                    event.Handler(keyCode, keyChar);
                }
                else {
                    break;
                }
            }
            catch (ex) {

            }
        }
    }
    public GetMousePosition(): Vector2 {
        return this.mousePos.SUB(Data.I.FrameOffset).MUL(Data.I.BackFrameScale);
    }
    public OnInputEvent(handler: any, name: string, typeId: number, keyCode: number): WGAEventContainer {
        this.RemoveHandler(name, typeId);

        this.eventsHandlers.push(<WGAEventContainer>{
            Handler: handler,
            Name: name,
            Type: typeId,
            KeyCode: keyCode
        });

        return this.eventsHandlers[this.eventsHandlers.length - 1];
    }
    public RemoveHandlerByObj(handler: any): boolean {
        return this.RemoveHandler(handler.name, handler.type);
    }
    public RemoveHandler(name: string, typeId: number): boolean {
        var status = false;

        for (var i = 0; i < this.eventsHandlers.length; i++) {
            var event = this.eventsHandlers[i];

            if (event.Name == name && event.Type == typeId) {
                this.eventsHandlers.splice(1, i);
                status = true;
            }
        }

        return status;
    }
}
