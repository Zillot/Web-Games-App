class Utils {
	randI(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	randF(min, max) {
		return Math.random() * (max - min) + min;
	}
	randColor() {
		return new Color4(this.randI(0, 255), this.randI(0, 255), this.randI(0, 255), 1);
	}
}