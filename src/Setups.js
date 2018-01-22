class Setups {
	//windowWidth
	//windowHeight
	
	//utils
	//draw
	//core
	
	//allGames
	
	constructor() {
		Setups.windowWidth = window.innerWidth;
		Setups.windowHeight = window.innerHeight;
	
		Setups.utils = new Utils();
		Setups.draw = new Draw();
		Setups.core = new Core();
			
		Setups.allGames = [{
			name: "zombieShoter",
			game: new ZombieShoter()
		}];
	}
}