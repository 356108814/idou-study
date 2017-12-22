/**
 * 位图
 */
class GBitmap extends egret.Bitmap {
	public constructor(name: string) {
		super();
		let texture: egret.Texture = RES.getRes(name);
		this.texture = texture;
	}
}