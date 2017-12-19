module core {
	export class Server {
		private socket: Socket;
		private handlers: { [name: string]: Function } = {};

		public constructor() {
			this.handlers["CONNECT"] = this.onConnect;
			this.handlers["DATA"] = this.onMessage;
			this.handlers["CLOSE"] = this.onClose;
			this.handlers["ERROR"] = this.onError;
		}

		/**
		 * 初始化服务器连接
		 */
		public initServer() {
			// http
			// let http = new Http("http://127.0.0.1:8891")
			// http.send("/login", {"username": "a", "password": "b"}, "POST")

			this.socket = new Socket("127.0.0.1", 8891, egret.WebSocket.TYPE_BINARY);
			this.socket.setEventHandler(this.handlers);
			this.socket.connect();
		}

		public send(message: any) {
			this.socket.send(message);
		}

		private onConnect(message: any) {
			Log.debug("server connect");
			Core.Dispatcher.dispatch(new DataEvent(ServerEventName.SERVER_CONNECT))
		}

		/**
		 * 收到服务器消息唯一入口
		 * @param message string或egret.ByteArray
		 */
		private onMessage(message: any) {
			Log.debug("server message: " + message);

			//解析类缓存
			var builder = dcodeIO.ProtoBuf.loadProto(RES.getRes("user_proto"));
			var User = builder.build("User");
			var user = User.decode(message.buffer);

			Log.debug(user);
			Log.debug(user.username);
		}

		private onClose(message: any) {
			Log.debug("server close");
		}

		private onError(message: any) {
			Log.debug("server error");
		}
	}
}