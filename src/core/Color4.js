class Color4 {
	//R;
	//G;
	//B;
	//A;
	
	constructor(R, G, B, A) {
		this.R = R;
		this.G = G;
		this.B = B;
		this.A = A;
	}
	
	getInvertColor() {
		return new Color4(255 - this.R, 255 - this.G, 255 - this.B, this.A);
	}
	
	getRgba() {
		return 'rgba(' + this.R + ', ' + this.G + ', ' + this.B + ', ' + this.A + ')';
	}
	
	static colorFromHex(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return new Color4(
			parseInt(result[1], 16), 
			parseInt(result[2], 16), 
			parseInt(result[3], 16), 
			1);
		}
}