class Core {
	private constructor() {
	}

	public static server: core.Server = new core.Server();
	public static Dispatcher: mvc.Dispatcher = new mvc.Dispatcher();
	public static NetDispatcher: mvc.Dispatcher = new mvc.Dispatcher();
}