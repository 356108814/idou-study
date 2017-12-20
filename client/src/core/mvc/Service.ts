/**
 * 服务
 */
abstract class Service {

	protected send(key: string, data: any) {
		var Class = this.getProtoClass("User", "user_proto");
		var instance = new Class(data);
		//创建ByteArray数组用来保存消息对象并发送到网络
		var byteArray = new egret.ByteArray(instance.toArrayBuffer());
		Core.server.send(byteArray);
	}

	protected getProtoClass(className: string, resName: string) {
		let content = RES.getRes(resName);
		var builder = dcodeIO.ProtoBuf.loadProto(content);
		return builder.build(className);
	}
}