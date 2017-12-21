class MainUIController extends BaseController {
	private mainUIModule: MainUIModule;

	public constructor() {
		super(ModuleName.MainUI);
	}

	public init() {
	}

	public createModule(): BaseModule {
		this.mainUIModule = new MainUIModule();
		return this.mainUIModule;
	}

	public addEventListener() {
		super.addEventListener();
	}
}