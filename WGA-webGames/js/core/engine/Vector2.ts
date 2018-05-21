class Vector2 {
    public X: number;
    public Y: number;

    constructor(x?: Vector2 | number, y?: number) {
        var xVal: any = x;

        if (y == null && x == null) {
            //empty constructor
        }
        if (y == null) {
            this.X = xVal;
            this.Y = xVal;
        }
        else {
            this.X = xVal;
            this.Y = y;
        }
    }

    public Set(x: Vector2 | number, y?: number): Vector2 {
        var xVal: any = x;

        if (y == null) {
            this.X = xVal;
            this.Y = xVal;
		}
        else {
            this.X = xVal;
			this.Y = y;
		}
		
		return this;
    }

    public ADDE(v2: Vector2): Vector2 {
        var v = Vector2.ADD(this, v2);
        this.Set(v.X, v.Y);
		return this;
    }
    public SUBE(v2: Vector2): Vector2 {
        var v = Vector2.SUB(this, v2);
        this.Set(v.X, v.Y);
		return this;
    }
    public MULE(v2: Vector2): Vector2 {
        var v = Vector2.MUL(this, v2);
        this.Set(v.X, v.Y);
		return this;
    }
    public DIVE(v2: Vector2): Vector2 {
        var v = Vector2.DIV(this, v2);
        this.Set(v.X, v.Y);
		return this;
    }
	
    public DOT(v2: Vector2): number {
        return Vector2.DOT(this, v2);
    }
    public DET(v2: Vector2): number {
        return Vector2.DET(this, v2);
    }
    public ADD(v2): Vector2 {
        return Vector2.ADD(this, v2);
    }
    public SUB(v2): Vector2 {
        return Vector2.SUB(this, v2);
    }
    public MUL(v2): Vector2 {
        return Vector2.MUL(this, v2);
    }
    public DIV(v2): Vector2 {
        return Vector2.DIV(this, v2);
    }
    public Normalize(): Vector2 {
        var v = Vector2.Normalize(this);
        this.Set(v.X, v.Y);
		return this;
    }
    public Length(): number {
        return Vector2.Length(this);
    }
    public RotateTo(angle: number): Vector2 {
		var v = Vector2.GetRotated(this, angle);
        this.Set(v.X, v.Y);
		return this;
	}
    public AngleTo(v2: Vector2): number {
		return Vector2.AngleBetween(this, v2);
	}
    public AngleAbsTo(v2: Vector2): number {
		return Vector2.AngleAbsBetween(this, v2);
	}
    public Angle(v2: Vector2): number {
        return Vector2.Angle(this);
    }
    public AngleAbs(): number {
		return Vector2.AngleAbs(this);
	}

    public static DOT(v1: Vector2, v2: Vector2): number {
		return v1.X * v2.X + v1.Y * v2.Y;
    }
    public static DET(v1: Vector2, v2: Vector2): number {
		return v1.X * v2.Y - v2.X * v1.Y;
    }
    public static ADD(v1: Vector2, v2: Vector2 | number): Vector2 {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X + v2, v1.Y + v2);
        }
		return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
    }
    public static SUB(v1: Vector2, v2: Vector2 | number): Vector2 {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X - v2, v1.Y - v2);
        }
		return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
    }
    public static MUL(v1: Vector2, v2: Vector2 | number): Vector2 {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X * v2, v1.Y * v2);
        }
		return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
    }
    public static DIV(v1: Vector2, v2: Vector2 | number): Vector2 {
        if (typeof v2 === 'number') {
            return new Vector2(v1.X / v2, v1.Y / v2);
        }
		return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
    }
    public static Normalize(v: Vector2): Vector2 {
        var len = v.Length();
        return new Vector2(v.X / len, v.Y / len);
    }
    public static Distance(v1: Vector2, v2: Vector2): number {
        var v = new Vector2(v1.X - v2.X, v1.Y - v2.Y);
        return v.Length();
    }
    public static Length(v: Vector2): number {
        return Math.abs(Math.sqrt(v.X * v.X + v.Y * v.Y));
    }
    public static GetRotated(v1: Vector2, angle: number): Vector2 {
		var v = new Vector2(v1);
		
		v.X = Math.cos(angle) * v1.X - Math.sin(angle) * v1.Y;
		v.Y = Math.sin(angle) * v1.X + Math.cos(angle) * v1.Y;
		
		return v;
	}
	//from -PI to PI
    public static AngleBetween(v1: Vector2, v2: Vector2): number {
		return Math.atan2(v1.DET(v2), v1.DOT(v2));
	}
	//from 0 to 2PI
    public static AngleAbsBetween(v1: Vector2, v2: Vector2): number {
        var ang = Vector2.AngleBetween(v1, v2);
        if (ang < 0) {
            return Math.PI + Math.PI - Math.abs(ang);
        }
        return ang
	}
    public static Angle(v1: Vector2): number {
        return Vector2.AngleBetween(v1, Vector2.Up());
    }
    public static AngleAbs(v1: Vector2): number {
		return Vector2.AngleAbsBetween(v1, Vector2.Up());
	}
	
    public static up: Vector2;
    public static Up(): Vector2 {
        if (!Vector2.up) {
            Vector2.up = new Vector2(0, -1);
        }
        return Vector2.up;
	}
    public static upright: Vector2;
    public static Upright(): Vector2 {
        if (!Vector2.upright) {
            Vector2.upright = new Vector2(1, -1).Normalize();
        }
        return Vector2.upright;
    }
    public static right: Vector2;
    public static Right(): Vector2 {
        if (!Vector2.right) {
            Vector2.right = new Vector2(1, 0);
        }
        return Vector2.right;
    }
    public static rightdown: Vector2;
    public static Rightdown(): Vector2 {
        if (!Vector2.rightdown) {
            Vector2.rightdown = new Vector2(1, 1).Normalize();
        }
        return Vector2.rightdown;
    }
    public static down: Vector2;
    public static Down(): Vector2 {
        if (!Vector2.down) {
            Vector2.down = new Vector2(0, 1);
        }
        return Vector2.down;
    }
    public static downleft: Vector2;
    public static Downleft(): Vector2 {
        if (!Vector2.downleft) {
            Vector2.downleft = new Vector2(-1, 1).Normalize();
        }
        return Vector2.downleft;
    }
    public static left: Vector2;
    public static Left(): Vector2 {
        if (!Vector2.left) {
            Vector2.left = new Vector2(-1, 0);
        }
        return Vector2.left;
    }
    public static leftup: Vector2;
    public static Leftup(): Vector2 {
        if (!Vector2.leftup) {
            Vector2.leftup = new Vector2(-1, -1).Normalize();
        }
        return Vector2.leftup;
    }
}