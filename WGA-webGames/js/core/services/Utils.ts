class Utils {
    //include min and max
    public RandI(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
    //include min and max
    public RandF(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}
    public RandColor(): Color4 {
		return new Color4(this.RandI(0, 255), this.RandI(0, 255), this.RandI(0, 255), 1);
	}
}