class Input {
    //mousePos
    //mouseDown
    //toClickEvent

    //eventsHandlers
    //clicks

    constructor() {
        this.mousePos = new Vector2();
        this.eventsHandlers = [];
        this.clicks = [];

        this.mouseDown = 0;

        var those = this;
        var canvas = document.getElementById(Setups.CanvasName);
        document.body.onmousedown =  function() { those.mouseDownFun(those); };
        document.body.onmouseup = function() { those.mouseUpFun(those); };
        canvas.addEventListener('mousemove', function(evt) { those.mouseMoveFun(those, canvas, evt); }, false);
    }

    getMousePos(canvas, evt) {

    }
    mouseDownFun(those) {
        those.mouseDown++;
        if (those.mouseDown > 1) {
            those.mouseDown = 1;
        }
        those.eventThrow(EventsTypes.leftMouseDown);
    }
    mouseUpFun(those) {
        those.mouseDown--;
        if (those.mouseDown < 0) {
            those.mouseDown = 0;
        }
        this.eventThrow(EventsTypes.leftMouseUp);
        this.eventThrow(EventsTypes.leftMouseClick);
    }
    mouseMoveFun(those, canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        those.mousePos = new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
    }

    getMouseState() {
        if (this.mouseDown == 0) {
           return MouseState.up;
        }
        else if (this.mouseDown == 1) {
            return MouseState.down;
        }
        else {
            return MouseState.undefined;
        }
    }
    preventHandlers() {
        this.enableEvent = false;
    }
    eventThrow(type) {
        this.enableEvent = true;

        for (var eventKey in this.eventsHandlers) {
            var event = this.eventsHandlers[eventKey];

            try {
                if (this.enableEvent && event.type == type) {
                    event.handler();
                }
                else {
                    break;
                }
            }
            catch(ex) {

            }
        }
    }
    getMousePosition() {
        return this.mousePos;
    }
    onInputEvent(handler, name, type) {
        this.removeHandler(name, type);

        this.eventsHandlers.push({
            handler: handler,
            name: name,
            type: type
        });

        return this.eventsHandlers[this.eventsHandlers.length - 1];
    }
    removeHandlerByObj(handler) {
        return this.removeHandler(handler.name, handler.type);
    }
    removeHandler(name, type) {
        var status = false;

        for (var i = 0; i < this.eventsHandlers.length; i++) {
            var event = this.eventsHandlers[i];

            if (event.name == name && event.type == type) {
                this.eventsHandlers.splice(1, i);
                status = true;
            }
        }

        return status;
    }
}

var MouseState = Object.freeze({ "down":1, "up":2, "undefined":3 })
var EventsTypes = Object.freeze({ "leftMouseClick":1, "leftMouseUp":2, "leftMouseDown":3 })