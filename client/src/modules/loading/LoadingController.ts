class LoadingController extends Controller{
	private loadingUI: LoadingUI;

	public constructor() {
		super();
	}

	protected init() {
		this.service = new LoadingService();
	}

	public initView(): View {
		this.loadingUI = new LoadingUI();
		return this.loadingUI;
	}

	public addEventListener() {
		Core.Dispatcher.addListener(EventName.UI_MAIN_UI, this.onViewHandler)
		Core.Dispatcher.addListener(EventName.LOADING_PROGRESS, this.onProgressHandler)
	}

	public removeEventListener() {
		
	}

	private onProgressHandler(e: DataEvent) {
		let a = e.data as Array<number>;
		let current = a[0];
		let total = a[1];
		this.loadingUI.setProgress(current, total);
	}
}