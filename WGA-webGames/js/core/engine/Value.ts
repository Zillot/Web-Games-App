class Value {
	private value: number;
    private valueGoal: number;
    private speed: number;
    private callbacks: CallbackFunction[];
    private dir: number;
    private pause: number;
	
    constructor(value: number, speed: number) {
		this.callbacks = [];
		this.value = value; 
		this.valueGoal = value;
		this.speed = speed;
		this.dir = 1;
		this.pause = 1;
	}
	
	public ClearCallback(): void {
		this.callbacks = [];
	}
	
    public Stop(cancelCallback: CallbackFunction): void {
		this.value = this.valueGoal;
		
		if (cancelCallback) {
			this.ClearCallback();
		}
	}
	
    public Pause(): void {
		this.pause = 0;
	}

    public GetVal(): number {
		return this.value;
	}

    public GoToDelta(delta: number, speed?: number, callback?: CallbackFunction): void {
		this.GoTo(this.value + delta, speed, callback);
	}
	
    public GoTo(value: number, speed?: number, callback?: CallbackFunction): void {
		this.pause = 1;
		
		if (callback != null) {
			this.callbacks.push(callback);
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
	
    public Update(timeDelta: number): void {
		this.value += this.speed * this.dir * timeDelta * this.pause;
		
		if (this.dir == 1 && this.value >= this.valueGoal || this.dir == -1 && this.value <= this.valueGoal) {
			this.value = this.valueGoal;
			this.dir = 0;
			for (var callbackKey in this.callbacks) {
				this.callbacks[callbackKey]();
			}
			
			this.ClearCallback();
		}
	}
}