class DataEvent extends egret.Event {

	public constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean) {
		super(type, bubbles, cancelable, data);
	}
}