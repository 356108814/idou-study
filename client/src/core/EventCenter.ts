/**
 * 事件中心
 */
class EventCenter {
	private static dispatcher: Dispatcher;
	private static netDispatcher: Dispatcher;

	public static init() {
		EventCenter.dispatcher = new Dispatcher();
		EventCenter.netDispatcher = new Dispatcher();
	}

	/**
	 * 分发事件
	 */
	public static dispatch(dataEvent: DataEvent, isNet: Boolean = false) {
		EventCenter.dispatcher.dispatchEvent(dataEvent);
	}

	/**
	 * 监听事件
	 */
	public static addListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
		EventCenter.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
	}

	/**
	 * 分发与服务器通信相关事件
	 */
	public static dispatchNet(dataEvent: DataEvent, isNet: Boolean = false) {
		EventCenter.netDispatcher.dispatchEvent(dataEvent);
	}

	/**
	 * 监听与服务器通信相关事件
	 */
	public static addListenerNet(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
		EventCenter.netDispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
	}
}