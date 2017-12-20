/**
 * 视图
 */
abstract class View extends eui.Group {
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