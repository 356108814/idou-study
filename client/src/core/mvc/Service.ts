/**
 * 服务
 */
abstract class Service {

	/**
	 * http get请求
	 */
	protected get(url: string, data: any = "", handler: Function = null, netEventName: string = null): void {
		Global.game.getNet().get(url, data, handler, netEventName);
	}

	/**
	 * http post请求
	 */
	protected post(url: string, data: any, handler: Function = null, netEventName: string = null): any {
		Global.game.getNet().post(url, data, handler, netEventName);
	}

	/**
	 * 发送socket数据
	 */
	protected send(key: string, data: any): void {
		var Class = this.getProtoClass("User", "user_proto");
		var instance = new Class(data);
		//创建ByteArray数组用来保存消息对象并发送到网络
		var byteArray = new egret.ByteArray(instance.toArrayBuffer());
		Global.game.getNet().send(byteArray);
	}

	protected getProtoClass(className: string, resName: string): any {
		let content = RES.getRes(resName);
		var builder = dcodeIO.ProtoBuf.loadProto(content);
		return builder.build(className);
	}
}