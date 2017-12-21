class LoadingController extends BaseController {
	private loadingModule: LoadingModule;
	private service: LoadingService;

	public constructor() {
		super(ModuleName.Loading);
	}

	public init() {
		this.service = new LoadingService();
	}

	public createModule(): BaseModule {
		this.loadingModule = new LoadingModule();
		return this.loadingModule;
	}

	public addEventListener() {
		super.addEventListener();
		EventCenter.addListener(EventName.LOADING_PROGRESS, this.onProgressHandler, this)
	}

	public removeEventListener() {
		super.removeEventListener();
	}

	private onProgressHandler(e: DataEvent) {
		let a = e.data as Array<number>;
		let current = a[0];
		let total = a[1];
		this.loadingModule.setProgress(current, total);
	}
}