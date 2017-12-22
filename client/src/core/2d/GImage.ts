/**
 * 加载图片
 */
class GImage extends egret.Bitmap {
	private imgLoader: egret.ImageLoader;

	public constructor(url: string) {
		super();
		this.imgLoader = new egret.ImageLoader;
        this.imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        this.imgLoader.load(url);
	}

	public setUrl(url: string) {
		this.imgLoader.load(url);
	}

	private imgLoadHandler(evt: egret.Event): void {
        var loader: egret.ImageLoader = evt.currentTarget;
        var bitmapData: egret.BitmapData = loader.data;
        var texture = new egret.Texture();
        texture.bitmapData = bitmapData;
		this.texture = texture;
    }
}