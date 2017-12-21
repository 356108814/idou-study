/**
 * http请求，支持GET、POST，请求重试
 */
class Http {

    private serverUrl: string;
    private request: egret.HttpRequest;
    private cache: Array<any>;
    private isRequesting: boolean;
    private currentReqData: Array<any>;

    public constructor(serverUrl: string) {
        this.serverUrl = serverUrl;
        this.cache = [];

        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
    }

    /**
     * 发送数据。POST以json格式发送
     * @param netEventName 成功发送事件名称
     * @param handler 成功回调函数
     */
    public send(url: string, data: any, method: string = "GET", netEventName: string = null, handler: Function = null) {
        this.cache.push([url, method, data, netEventName, handler]);
        this.nextRequest();
    }

    private executeRequest() {
        var a = this.cache.shift();
        this.currentReqData = a;
        if (this.currentReqData == null) {
            return null;
        }
        let url = a[0];
        let method = (<string>a[1]) == "GET" ? egret.HttpMethod.GET : egret.HttpMethod.POST;
        let data = a[2];
        if (method == egret.HttpMethod.GET) {
            this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if (typeof data === "string") {
                url = url + "?" + data;
            } else if (typeof data === "object") {
                var params = "?";
                for (let k in data) {
                    params += `${k}=${data[k]}&`;
                }
                params = params.substr(0, params.length - 1);
                url += params;
            }
        } else {
            // 使用application/json报跨域.....?
            // this.request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            data = JSON.stringify(data);
        }
        this.request.open(this.serverUrl + url, method);
        this.request.send(data);
        this.isRequesting = true;
    }

    private nextRequest() {
        this.isRequesting = false;
        this.executeRequest();
    }

    private onComplete(event: egret.Event): void {
        let request = <egret.HttpRequest>event.currentTarget;
        let response = request.response;
        let data = JSON.parse(response.data);
        if (this.currentReqData != null) {
            let netEventName = this.currentReqData[3];
            let handler = this.currentReqData[3];
            if (netEventName != null && netEventName != "") {
                EventCenter.dispatchNet(new DataEvent(netEventName, data));
            }
            if (handler != null) {
                handler(data);
            }
        }
        Log.debug(data);
        this.nextRequest();
    }

    private onIOError(event: egret.IOErrorEvent): void {
        this.nextRequest();
        Log.debug(event);
    }
}
