class Utils {
	//include min and max
	randI(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
    //include min and max
    randF(min, max) {
		return Math.random() * (max - min) + min;
	}
	randColor() {
		return new Color4(this.randI(0, 255), this.randI(0, 255), this.randI(0, 255), 1);
	}
}