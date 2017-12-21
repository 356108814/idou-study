/**
 * 网络通信
 */
class Net {
	private httpServerUrl: string = "http://127.0.0.1:8891";

	private http: Http;
	private server: Server;

	public constructor() {
		this.http = new Http(this.httpServerUrl);
		this.server = new Server();
		this.server.initServer();
	}

	/**
	 * http get请求
	 */
	public get(url: string, data: any = "",  handler: Function = null, netEventName: string = null): void {
		this.http.send(url, data, "GET", netEventName, handler);
	}

	/**
	 * http post请求
	 */
	public post(url: string, data: any, handler: Function = null, netEventName: string = null, ): any {
		this.http.send(url, data, "POST", netEventName, handler);
	}

	/**
	 * socket send
	 */
	public send(message: any): void {
		this.server.send(message);
	}
}