class Setups {
	//windowWidth
	//windowHeight
	
	//utils
	//draw
	//core
	//app
	
	constructor() {
		Setups.windowWidth = window.innerWidth;
		Setups.windowHeight = window.innerHeight;
	
		Setups.utils = new Utils();
		Setups.draw = new Draw();
		Setups.core = new Core();
        Setups.app = new App();
	}
}