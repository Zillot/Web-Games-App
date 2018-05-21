var Input = /** @class */ (function () {
    function Input() {
        var _this = this;
        this.MousePos = new Vector2();
        this.eventsHandlers = [];
        this.mouseDown = 0;
        var canvas = document.getElementById(Setups.I.CanvasName);
        document.body.onmousedown = function () { return _this.MouseDownFun(_this); };
        document.body.onmouseup = function () { return _this.MouseUpFun(_this); };
        canvas.addEventListener('mousemove', function (evt) { return _this.MouseMoveFun(_this, canvas, evt); }, false);
    }
    Input.prototype.MouseDownFun = function (those) {
        those.mouseDown++;
        if (those.mouseDown > 1) {
            those.mouseDown = 1;
        }
        those.EventThrow(EventsTypes.leftMouseDown);
    };
    Input.prototype.MouseUpFun = function (those) {
        those.mouseDown--;
        if (those.mouseDown < 0) {
            those.mouseDown = 0;
        }
        this.EventThrow(EventsTypes.leftMouseUp);
        this.EventThrow(EventsTypes.leftMouseClick);
    };
    Input.prototype.MouseMoveFun = function (those, canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        those.MousePos = new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
    };
    Input.prototype.GetMouseState = function () {
        if (this.mouseDown == 0) {
            return MouseState.up;
        }
        else if (this.mouseDown == 1) {
            return MouseState.down;
        }
        else {
            return MouseState.undefined;
        }
    };
    Input.prototype.PreventHandlers = function () {
        this.enableEvent = false;
    };
    Input.prototype.EventThrow = function (typeId) {
        this.enableEvent = true;
        for (var eventKey in this.eventsHandlers) {
            var event = this.eventsHandlers[eventKey];
            try {
                if (this.enableEvent && event.Type == typeId) {
                    event.Handler();
                }
                else {
                    break;
                }
            }
            catch (ex) {
            }
        }
    };
    Input.prototype.GetMousePosition = function () {
        return this.MousePos;
    };
    Input.prototype.OnInputEvent = function (handler, name, typeId) {
        this.RemoveHandler(name, typeId);
        this.eventsHandlers.push({
            Handler: handler,
            Name: name,
            Type: typeId
        });
        return this.eventsHandlers[this.eventsHandlers.length - 1];
    };
    Input.prototype.RemoveHandlerByObj = function (handler) {
        return this.RemoveHandler(handler.name, handler.type);
    };
    Input.prototype.RemoveHandler = function (name, typeId) {
        var status = false;
        for (var i = 0; i < this.eventsHandlers.length; i++) {
            var event = this.eventsHandlers[i];
            if (event.Name == name && event.Type == typeId) {
                this.eventsHandlers.splice(1, i);
                status = true;
            }
        }
        return status;
    };
    return Input;
}());
var MouseState = Object.freeze({ "down": 1, "up": 2, "undefined": 3 });
var EventsTypes = Object.freeze({ "leftMouseClick": 1, "leftMouseUp": 2, "leftMouseDown": 3 });
//# sourceMappingURL=Input.js.map