/**
 * 模块基类
 */
abstract class BaseModule extends eui.Group implements View {
	public moduleName: string;
	private _parent: egret.DisplayObjectContainer;
	private _show: Boolean = false;

	public constructor(parent: egret.DisplayObjectContainer = LayerManager.uiLayer) {
		super();
		this._parent = parent;
		this.createView();
	}

	/**
     * 初始化视图
     */
	abstract createView();

	public show() {
		this._parent.addChild(this);
		this._show = true;
	}

	public hide() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this._show = false;
	}

	public isShow() {
		return this._show;
	}
}