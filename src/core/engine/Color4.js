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

	getTransparent(opacity) {
	    return new Color4(this.R, this.G, this.B, opacity);
    }
	
	static colorFromHex(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return new Color4(
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16),
			1);
	}

    static White() {
	    if (Color4._White == null) {
            Color4._White = new Color4(255, 255, 255, 1);
        }
        return Color4._White;
    }

	static Black() {
        if (Color4._Black == null) {
            Color4._Black = new Color4(0, 0, 0, 1);
        }
        return Color4._Black;
    }

    static Gray() {
        if (Color4._Gray == null) {
            Color4._Gray = new Color4(100, 100, 100, 1);
        }
        return Color4._Gray;
    }

    static Red() {
        if (Color4._Red == null) {
            Color4._Red = new Color4(255, 64, 0, 1);
        }
        return Color4._Red;
    }

    static Orange() {
        if (Color4._Orange == null) {
            Color4._Orange = new Color4(255, 128, 1);
        }
        return Color4._Orange;
    }

    static Yellow() {
        if (Color4._Yellow == null) {
            Color4._Yellow = new Color4(255, 255, 0, 1);
        }
        return Color4._Yellow;
    }

    static Green() {
        if (Color4._Green == null) {
            Color4._Green = new Color4(64, 255, 0, 1);
        }
        return Color4._Green;
    }

    static Cyan() {
        if (Color4._Green == null) {
            Color4._Green = new Color4(0, 255, 255, 1);
        }
        return Color4._Green;
    }

    static Blue() {
        if (Color4._Blue == null) {
            Color4._Blue = new Color4(0, 0, 255, 1);
        }
        return Color4._Blue;
    }

    static Violet() {
        if (Color4._Violet == null) {
            Color4._Violet = new Color4(191, 0, 255, 1);
        }
        return Color4._Violet;
    }

    static Purple() {
        if (Color4._Purple == null) {
            Color4._Purple = new Color4(255, 0, 191, 1);
        }
        return Color4._Purple;
    }

    static Tomato() {
        if (Color4._Tomato == null) {
            Color4._Tomato = new Color4(230, 46, 0, 1);
        }
        return Color4._Tomato;
    }
}