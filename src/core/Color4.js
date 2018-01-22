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

	static Black() {
    	return new Color4(0, 0, 0, 1);
    }

    static Gray() {
        return new Color4(100, 100, 100, 1);
    }

    static Red() {
        return new Color4(255, 64, 0, 1);
    }

    static Orange() {
        return new Color4(255, 128, 1);
    }

    static Yellow() {
        return new Color4(255, 255, 0, 1);
    }

    static Green() {
        return new Color4(64, 255, 0, 1);
    }

    static Cyan() {
        return new Color4(0, 255, 255, 1);
    }

    static Blue() {
        return new Color4(0, 0, 255, 1);
    }

    static Violet() {
        return new Color4(191, 0, 255, 1);
    }

    static Purple() {
        return new Color4(255, 0, 191, 1);
    }

    static Tomato() {
        return new Color4(230, 46, 0, 1);
    }
}