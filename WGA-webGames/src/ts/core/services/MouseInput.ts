import { Injectable } from '@angular/core';
import { Data } from "../../app/Data";
import { Vector2 } from "../engine/Vector2";
import { MouseState } from "../models/MouseState";
import { EventsTypes } from "../models/EventsTypes";
import { Events } from './Events';
import { MouseButtons } from '../models/MouseButtons';
import { MouseButtonsOperations } from '../models/MouseButtonsOperations';
import { ConditionCheckFunction } from '../CallbackFunction';

@Injectable()
export class MouseInput {
    private static mousePos: Vector2 = new Vector2();
    private static mouseDown: number;

    private _events: Events;
    private mouseDownSetter: any;
    private mouseUpSetter: any;

    public constructor(events: Events) {
        this._events = events;
    }
    public Initialize() {
        MouseInput.mouseDown = 0;

        var canvas = document.getElementById(Data.I.Camera.CanvasName);

        document.body.addEventListener('dblclick', (e) => {
            this.MouseDoubleClick(this._events, e);
        });
        document.body.addEventListener('click', (e) => {
            this.MouseClick(this._events, e);
        });
        document.body.addEventListener('mousedown', (e) => {
            this.MouseDown(this._events, e);
        });
        document.body.addEventListener('mouseup', (e) => {
            this.MouseUp(this._events, e);
        });
        canvas.addEventListener('mousemove', evt => this.MouseMove(canvas, evt), false);
    }
    public PreventNextEvent() {
        this._events.PreventNextEvent();
    }
    public GetButtonName(id: number): string {
        if (id == 0) {
            return MouseButtons.Left;
        }
        else if (id == 1) {
            return MouseButtons.Middle;
        }
        else if (id == 2) {
            return MouseButtons.Right;
        }

        return null;
    }
    private MouseDoubleClick(events: Events, e: MouseEvent): void {
        events.EventThrow(EventsTypes.MouseButtons, this.GetButtonName(e.button) + MouseButtonsOperations.DoubleClick);
    }
    private MouseClick(events: Events, e: MouseEvent): void {
        var processed = events.EventThrow(EventsTypes.MouseButtons, this.GetButtonName(e.button) + MouseButtonsOperations.Click);

        if (processed) {
            if (this.mouseDownSetter != null) {
                clearTimeout(this.mouseDownSetter);
            }
            if (this.mouseUpSetter != null) {
                this.moveMouseDownValue(-1);
                clearTimeout(this.mouseUpSetter);
            }
        }
    }
    private MouseDown(events: Events, e: MouseEvent): void {
        this.mouseDownSetter = setTimeout(() => {
            this.moveMouseDownValue(1);
            this.mouseDownSetter = null;

            events.EventThrow(EventsTypes.MouseButtons, this.GetButtonName(e.button) + MouseButtonsOperations.Down);
        }, 100);
        
    }
    private MouseUp(events: Events, e: MouseEvent): void {
        this.mouseUpSetter = setTimeout(() => {
            this.moveMouseDownValue(-1);
            this.mouseUpSetter = null;

            events.EventThrow(EventsTypes.MouseButtons, this.GetButtonName(e.button) + MouseButtonsOperations.Up);
        }, 100);

    }
    private moveMouseDownValue(offset: number) {
        MouseInput.mouseDown += offset;

        if (MouseInput.mouseDown > 1) {
            MouseInput.mouseDown = 1;
        }
        if (MouseInput.mouseDown < 0) {
            MouseInput.mouseDown = 0;
        }
    }
    private MouseMove(canvas: any, evt: any): void {
        var rect = canvas.getBoundingClientRect();
        MouseInput.mousePos = new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
    }
    public static GetMouseState(): number {
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
    public static GetMousePosition(): Vector2 {
        return MouseInput.mousePos.SUB(Data.I.FrameOffset).MUL(Data.I.BackFrameScale);
    }
    public OnMouseEvent(handler: any, eventName: string, conditionCheckFunction: ConditionCheckFunction, button: MouseButtons, buttonOperation: MouseButtonsOperations): void {
        this._events.OnEvent(handler, eventName, conditionCheckFunction, EventsTypes.MouseButtons, button + buttonOperation);
    }
    public RemoveHandler(name: string): boolean {
        return this._events.RemoveHandler(name, EventsTypes.MouseButtons)
    }
}
