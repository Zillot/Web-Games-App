class Value {
	//value;
	//valueGoal;
	//speed;
	//callback;
	//pause;
	
	constructor(value, speed) {
		this.callback = [];
		this.value = value; 
		this.valueGoal = value;
		this.speed = speed;
		this.dir = 1;
		this.pause = 1;
	}
	
	clearCallback() {
		this.callback = [];
	}
	
	stop(cancelCallback) {
		this.value = this.valueGoal;
		
		if (cancelCallback) {
			this.clearCallback();
		}
	}
	
	pause() {
		this.pause = 0;
	}
	
	getVal() {
		return this.value;
	}
	
	goTo(value, speed, callback) {
		this.pause = 1;
		
		if (callback != null) {
			this.callback.push(callback);
		}
		
		if (speed != null) {
			this.speed = speed;
		}
		
		this.valueGoal = value;
		
		if (this.value < value) {
			this.dir = 1;
		}
		else if (this.value > value) {
			this.dir = -1;
		}
		else if (this.value == value) {
			this.dir = 0;
		}
	}
	
	update(timeDelta) {
		this.value += this.speed * this.dir * timeDelta * this.pause;
		
		if (this.dir == 1 && this.value >= this.valueGoal || this.dir == -1 && this.value <= this.valueGoal) {
			this.value = this.valueGoal;
			this.dir = 0;
			for (var callbackKey in this.callback) {
				this.callback[callbackKey]();
			}
			
			this.clearCallback();
		}
	}
}