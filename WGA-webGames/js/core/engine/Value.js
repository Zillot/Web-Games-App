var Value = /** @class */ (function () {
    function Value(value, speed) {
        this.callbacks = [];
        this.value = value;
        this.valueGoal = value;
        this.speed = speed;
        this.dir = 1;
        this.pause = 1;
    }
    Value.prototype.ClearCallback = function () {
        this.callbacks = [];
    };
    Value.prototype.Stop = function (cancelCallback) {
        this.value = this.valueGoal;
        if (cancelCallback) {
            this.ClearCallback();
        }
    };
    Value.prototype.Pause = function () {
        this.pause = 0;
    };
    Value.prototype.GetVal = function () {
        return this.value;
    };
    Value.prototype.GoToDelta = function (delta, speed, callback) {
        this.GoTo(this.value + delta, speed, callback);
    };
    Value.prototype.GoTo = function (value, speed, callback) {
        this.pause = 1;
        if (callback != null) {
            this.callbacks.push(callback);
        }
        if (speed != null) {
            this.speed = speed;
        }
        this.valueGoal = value;
        if (this.value < value) {
            this.dir = 1;
        }
        else if (this.value > value) {
            this.dir = -1;
        }
        else if (this.value == value) {
            this.dir = 0;
        }
    };
    Value.prototype.Update = function (timeDelta) {
        this.value += this.speed * this.dir * timeDelta * this.pause;
        if (this.dir == 1 && this.value >= this.valueGoal || this.dir == -1 && this.value <= this.valueGoal) {
            this.value = this.valueGoal;
            this.dir = 0;
            for (var callbackKey in this.callbacks) {
                this.callbacks[callbackKey]();
            }
            this.ClearCallback();
        }
    };
    return Value;
}());
//# sourceMappingURL=Value.js.map