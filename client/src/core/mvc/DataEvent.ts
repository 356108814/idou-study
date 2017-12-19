class DataEvent {
	public type: string;
	public data: any;

	public constructor(type: string, data?: any) {
		this.type = type;
		this.data = data;
	}
}