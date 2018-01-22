class Draw {
	//ctx;
	
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
		
		if (typeof origin == "number") {
			origin = new Vector2(origin, origin);
		}
		if (typeof scale == "number") {
			scale = new Vector2(scale, scale);
		}
		
		if (type != "measure") {
			//TODO!!
			var sizeX = this.textMeasure(str, pos, color, fontName, fontSize, origin, angle, scale).width;
			var sizeY = fontSize;
			
			var x = -(sizeX / 2) + (sizeX / 2) * origin.X;
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
			this.ctx.restore();
			return this.ctx.measureText(str);
		}
		this.ctx.restore();
	}
}