class Draw {
	//ctx;

    static PI2() { return 6.283185307179586476925286766559 }
    static PI() { return 3.1415926535897932384626433832795 }

	setCtx(ctx) {
		this.ctx = ctx;
	}
	
	rect(pos, size, origin, color, angle, scale) {
		if (pos == null) { pos = new Vector2(0, 0); }
		if (size == null) { size = new Vector2(0, 0); }
		if (origin == null) { origin = new Vector2(0, 0); }
		if (color == null) { color = new Color4(0, 0, 0, 1); }
		if (angle == null) { angle = 0; }
		if (scale == null) { scale = new Vector2(1, 1); }
		
		if (typeof origin == "number") {
			origin = new Vector2(origin, origin);
		}
		if (typeof scale == "number") {
			scale = new Vector2(scale, scale);
		}

        origin = origin.MUL(new Vector2(-1, -1));
		
		this.ctx.save();
		this.ctx.translate(pos.X, pos.Y);
		this.ctx.scale(scale.X, scale.Y);
		this.ctx.rotate(angle);
		
        this.ctx.fillStyle = color.getRgba();
		
		var x = -(size.X / 2) + (size.X / 2) * origin.X;
		var y = -(size.Y / 2) + (size.Y / 2) * origin.Y;
        this.ctx.fillRect(x, y, size.X, size.Y);
		this.ctx.restore();
	}
	
	line(pos1, pos2, thickness, color) {
		if (color == null) { color = "#000000FF"; }
		if (thickness == null) { opacity = 1; }
		
		if (typeof color == "Color4") {
			color = color.getHex();
		}
		
		this.ctx.save();
		//
		this.ctx.restore();
	}

	circle(pos, radius, origin, color, scale) {
        if (pos == null) { pos = new Vector2(0, 0); }
        if (radius == null) { radius = 1; }
        if (origin == null) { origin = new Vector2(0, 0); }
        if (color == null) { color = new Color4(0, 0, 0, 1); }
        if (scale == null) { scale = new Vector2(1, 1); }

        if (typeof origin == "number") {
            origin = new Vector2(origin, origin);
        }
        if (typeof scale == "number") {
            scale = new Vector2(scale, scale);
        }

        origin = origin.MUL(new Vector2(-1, -1));

        this.ctx.save();
        this.ctx.translate(pos.X, pos.Y);
        this.ctx.scale(scale.X, scale.Y);

        this.ctx.fillStyle = color.getRgba();

        var x = -(radius / 2) + (radius / 2) * origin.X;
        var y = -(radius / 2) + (radius / 2) * origin.Y;

        this.ctx.arc(x, y, radius, 0, Draw.PI2(), false);
        this.ctx.restore();
    }

	textFill(str, pos, color, fontName, fontSize, origin, angle, scale) {
		this.drawText(str, pos, color, fontName, fontSize, origin, angle, scale, "fill");
	}
	textStroke(str, pos, color, fontName, fontSize, origin, angle, scale) {
		this.drawText(str, pos, color, fontName, fontSize, origin, angle, scale, "stroke");
	}
	textMeasure(str, pos, color, fontName, fontSize, origin, angle, scale) {
		return this.drawText(str, pos, color, fontName, fontSize, origin, angle, scale, "measure");
	}
	
	drawText(str, pos, color, fontName, fontSize, origin, angle, scale, type) {
		if (color == null) { color = new Color4(0, 0, 0, 1); }
		if (origin == null) { origin = new Vector2(0, 0); }
		if (angle == null) { angle = 0; }
		if (scale == null) { scale = new Vector2(1, 1); }
		if (fontName == null) { fontName = "serif" }
        if (fontSize == null) { fontSize = 10 }
		
		if (typeof origin == "number") {
			origin = new Vector2(origin, origin);
		}
		if (typeof scale == "number") {
			scale = new Vector2(scale, scale);
		}

        origin = origin.MUL(new Vector2(-1, -1));

		if (type != "measure") {
			//TODO!!
			var sizeX = this.textMeasure(str, pos, color, fontName, fontSize, origin, angle, scale);
			var sizeY = fontSize;

			var x = (sizeX / 2) * origin.X;
			var y = -(sizeY / 2) + (sizeY / 2) * origin.Y;
		}

		this.ctx.save();
		this.ctx.translate(pos.X, pos.Y);
		this.ctx.scale(scale.X, scale.Y);
		this.ctx.rotate(angle);

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
		
        this.ctx.fillStyle = color.getRgba();
		
		this.ctx.font = fontSize + "px " + fontName;
		
		if (type == "fill") {
			this.ctx.fillText(str, x, y);
		}
		else if (type == "stroke") {
			this.ctx.strokeText(str, x, y);
		}
		else if (type == "measure") {
			var res = this.ctx.measureText(str).width;
            this.ctx.restore();
            return res;
		}
		this.ctx.restore();
	}
}