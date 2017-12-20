/**
 * 控制器
 */
abstract class Controller {
    protected view: View;
    protected cache: Cache;
    protected service: Service;

    public constructor() {
        this.init();
        this.view = this.initView();
	}

    /**
     * 初始化视图
     */
    abstract initView(): View;

    /**
     * 启用事件监听
     */
    abstract addEventListener();

    /**
     * 移除事件监听
     */
    abstract removeEventListener();

    protected init() {

    }

    public getView(): View {
		return this.view;
    }

    public getCache(): Cache {
        return this.cache;
    }

    public getService(): Service {
        return this.service;
    }

    public show() {
        this.view.show();
        this.addEventListener();
    }

    public hide() {
        this.removeEventListener();
    }

    public onViewHandler(dataEvent: DataEvent) {
		let show = dataEvent.data as Boolean;
		if(show) {
			this.show();
		} else {
			this.hide();
		}
	}
}
