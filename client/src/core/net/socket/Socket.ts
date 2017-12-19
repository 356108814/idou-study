class Socket {
    private needReconnect: boolean = true;
    private maxReconnectCount = 10;

    private reconnectCount: number = 0;
    private connected: boolean;
    private socket: egret.WebSocket;
    private host: string;
    private port: number;
    private type: string;
    private handlers: { [name: string]: Function } = {};

    /**
     * 初始化服务器，默认以二进制格式发送和接收数据
     */
    public constructor(host: string, port: number, type: string = egret.WebSocket.TYPE_STRING) {
        this.host = host;
        this.port = port;
        this.type = type;
    }

    /**
     * 设置事件处理器
     * CONNECT
     * CLOSE
     * ERROR
     * DATA
     * 
     */
    public setEventHandler(handlers: { [name: string]: Function }) {
        this.handlers = handlers;
    }

    /**
     * 开始Socket连接
     */
    public connect(): void {
        this.socket = new egret.WebSocket();
        this.socket.type = this.type;
        Log.debug(`WebSocket: ${this.host}:${this.port}:${this.type}`);
        this.addEvents();
        this.socket.connect(this.host, this.port);
    }

    /**
     * 发送消息到服务器
     * @param msg
     */
    public send(message: any): void {
        if (this.type == egret.WebSocket.TYPE_STRING) {
            this.socket.writeUTF(message);
        } else {
            this.socket.writeBytes(message);
        }
    }

    /**
     * 关闭Socket连接
     */
    public close(): void {
        this.connected = false;
        this.closeCurrentSocket();
    }

    /**
     * 添加事件监听
     */
    private addEvents() {
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveData, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }

    /**
     * 移除事件监听
     */
    private removeEvents(): void {
        this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveData, this);
        this.socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }

    /**
     * 服务器连接成功
     */
    private onSocketOpen(): void {
        this.reconnectCount = 0;

        if (this.connected && this.needReconnect) {
            Core.NetDispatcher.dispatch(new DataEvent(SocketConst.SOCKET_RECONNECT));
        } else {
            Core.NetDispatcher.dispatch(new DataEvent(SocketConst.SOCKET_CONNECT));
        }

        this.connected = true;
        let handler = this.handlers["CONNECT"];
        if (handler != null) {
            handler(null);
        }
    }

    /**
     * 服务器断开连接
     */
    private onSocketClose(): void {
        this.connected = false;

        if (this.needReconnect) {
            Core.NetDispatcher.dispatch(new DataEvent(SocketConst.SOCKET_START_RECONNECT));
            this.reconnect();
        } else {
            Core.NetDispatcher.dispatch(new DataEvent(SocketConst.SOCKET_CLOSE));
        }
        let handler = this.handlers["CLOSE"];
        if (handler != null) {
            handler(null);
        }
    }

    /**
     * 服务器连接错误
     */
    private onSocketError(): void {
        if (this.needReconnect) {
            this.reconnect();
        } else {
            Core.NetDispatcher.dispatch(new DataEvent(SocketConst.SOCKET_NOCONNECT));
        }
        this.connected = false;
        let handler = this.handlers["ERROR"];
        if (handler != null) {
            handler(null);
        }
    }

    /**
     * 收到服务器数据
     */
    private onReceiveData(e: egret.Event): void {
        var data: any = null;
        if (this.type == egret.WebSocket.TYPE_STRING) {
            data = this.socket.readUTF();
        } else {
            data = new egret.ByteArray();
            this.socket.readBytes(data);
        }
        let handler = this.handlers["DATA"];
        if (handler != null) {
            handler(data);
        }
    }

    /**
     * 重新连接
     */
    private reconnect(): void {
        this.closeCurrentSocket();
        this.reconnectCount++;
        if (this.reconnectCount < this.maxReconnectCount) {
            this.connect();
        } else {
            this.reconnectCount = 0;
            if (this.connected) {
                Core.NetDispatcher.dispatch(new DataEvent(SocketConst.SOCKET_CLOSE));
            } else {
                Core.NetDispatcher.dispatch(new DataEvent(SocketConst.SOCKET_NOCONNECT));
            }
        }
    }

    /**
     * 清理当前的Socket连接
     */
    private closeCurrentSocket() {
        this.removeEvents();
        this.socket.close();
        this.socket = null;
    }
}