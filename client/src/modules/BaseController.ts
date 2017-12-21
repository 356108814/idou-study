/**
 * 控制器基类
 */
abstract class BaseController implements Controller {
	public moduleName: string = "asfdasdfsdf";
	protected initialized: Boolean;
	protected module: BaseModule;
	protected self: BaseController;

	public constructor(moduleName: string) {
		this.moduleName = moduleName;
		this.init();
		this.addEventListener();
		this.self = this;
	}

	/**
	 * 创建模块
	 */
	abstract createModule(): BaseModule;

	/**
	 * 初始化
	 */
	abstract init();

	protected addEventListener() {
		EventCenter.addListener(EventName.MODULE_SHOW, this.onModuleShowHandler, this);
	}

	protected removeEventListener() {
	}

	protected onModuleShowHandler(e: DataEvent) {
		let name = e.data[0];
		if (name == this.moduleName) {
			let show = e.data[1] as Boolean;
			if (show) {
				this.show();
			} else {
				this.hide();
			}
		}
	}

	public show() {
		if (!this.initialized) {
			this.module = this.createModule();
			this.initialized = true;
		}
		this.module.show();
		EventCenter.dispatch(new DataEvent(EventName.MODULE_SHOWED, [this.moduleName, true]));
	}

	public hide() {
		if (this.module != null) {
			this.module.hide();
			EventCenter.dispatch(new DataEvent(EventName.MODULE_SHOWED, [this.moduleName, false]));
		}
	}
}