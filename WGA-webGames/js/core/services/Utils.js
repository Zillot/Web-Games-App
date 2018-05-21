var Utils = /** @class */ (function () {
    function Utils() {
    }
    //include min and max
    Utils.prototype.RandI = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //include min and max
    Utils.prototype.RandF = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Utils.prototype.RandColor = function () {
        return new Color4(this.RandI(0, 255), this.RandI(0, 255), this.RandI(0, 255), 1);
    };
    return Utils;
}());
//# sourceMappingURL=Utils.js.map