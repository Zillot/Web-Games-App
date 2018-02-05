class Setups {
	//windowWidth
    //windowHeight
    //center

    //utils
	//draw
	//core
    //input
    //app

	constructor() {
		Setups.windowWidth = window.innerWidth;
		Setups.windowHeight = window.innerHeight;
        Setups.CanvasName = "DrawField";
		//-----------

        Setups.center = new Vector2(Setups.windowWidth, Setups.windowHeight).DIV(2);
	
		Setups.utils = new Utils();
		Setups.draw = new Draw();
        Setups.core = new Core();
        Setups.input = new Input();

        Setups.app = new App();
	}
}