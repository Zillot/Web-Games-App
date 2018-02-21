class Vector2 {
    //X;
    //Y;

    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
    set(x, y) {
		if (typeof x == "Vector2" && y == null)
		{
			this.X = x.X;
			this.Y = x.Y;
		}
		else {
			this.X = x;
			this.Y = y;
		}
		
		return this;
    }
    setVector(v) {
        this.X = v.X;
        this.Y = v.Y;
		return this;
    }

    DOTE(v2) {
        var v = Vector2.DOT(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
    DETE(v2) {
        var v = Vector2.DET(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
    ADDE(v2) {
        var v = Vector2.ADD(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
    SUBE(v2) {
        var v = Vector2.SUB(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
    MULE(v2) {
        var v = Vector2.MUL(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
    DIVE(v2) {
        var v = Vector2.DIV(this, v2);
        this.set(v.X, v.Y);
		return this;
    }
	
    DOT(v2) {
        return Vector2.DOT(this, v2);
    }
    DET(v2) {
        return Vector2.DET(this, v2);
    }
    ADD(v2) {
        return Vector2.ADD(this, v2);
    }
    SUB(v2) {
        return Vector2.SUB(this, v2);
    }
    MUL(v2) {
        return Vector2.MUL(this, v2);
    }
    DIV(v2) {
        return Vector2.DIV(this, v2);
    }
    normalize() {
        var v = Vector2.normalize(this);
        this.set(v.X, v.Y);
		return this;
    }
    length() {
        return Vector2.length(this);
    }
	rotateTo(angle) {
		var v = Vector2.getRotated(this, angle);
		this.set(v.X, v.Y);
		return this;
	}
	angleTo(v2) {
		return Vector2.angleBetween(this, v2);
	}
	angleAbsTo(v2) {
		return Vector2.angleAbsBetween(this, v2);
	}
    angle(v2) {
        return Vector2.angle(this);
    }
	angleAbs() {
		return Vector2.angleAbs(this);
	}

    static DOT(v1, v2) {
		return v1.X * v2.X + v1.Y * v2.Y;
    }
    static DET(v1, v2) {
		return v1.X * v2.Y - v2.X * v1.Y;
    }
    static ADD(v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X + v2, v1.Y + v2);
        }
		return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
    }
    static SUB(v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X - v2, v1.Y - v2);
        }
		return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
    }
    static MUL(v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X * v2, v1.Y * v2);
        }
		return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
    }
    static DIV(v1, v2) {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X / v2, v1.Y / v2);
        }
		return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
    }
    static normalize(v) {
        var len = v.length();
        return new Vector2(v.X / len, v.Y / len);
    }
    static distance(v1, v2) {
        var v = new Vector2(v1.X - v2.X, v1.Y - v2.Y);
        return v.length();
    }
    static length(v) {
        return Math.abs(Math.sqrt(v.X * v.X + v.Y * v.Y));
    }
	static getRotated(v1, angle) {
		var v = new Vector2(v1.X, v1.Y);
		
		v.X = Math.cos(angle) * v1.X - Math.sin(angle) * v1.Y;
		v.Y = Math.sin(angle) * v1.X + Math.cos(angle) * v1.Y;
		
		return v;
	}
	//from -PI to PI
	static angleBetween(v1, v2) {
		return Math.atan2(v1.DET(v2), v1.DOT(v2));
	}
	//from 0 to 2PI
	static angleAbsBetween(v1, v2) {
        var ang = Vector2.angleBetween(v1, v2);
        if (ang < 0) {
            return Math.PI + Math.PI - Math.abs(ang);
        }
        return ang
	}
    static angle(v1) {
        return Vector2.angleBetween(v1, Vector2.up());
    }
	static angleAbs(v1) {
		return Vector2.angleAbsBetween(v1, Vector2.up());
	}
	
	static up() {
		return new Vector2(0, -1);
	}
	static upright() {
		return new Vector2(0.707, -0.707);
	}
	static right() {
		return new Vector2(1, 0);
	}
	static rightdown() {
		return new Vector2(0.707, 0.707);
	}
	static down() {
		return new Vector2(0, 1);
	}
	static downleft() {
		return new Vector2(-0.707, 0.707);
	}
	static left() {
		return new Vector2(-1, 0);
	}
	static leftup() {
		return new Vector2(-0.707, -0.707);
	}
}