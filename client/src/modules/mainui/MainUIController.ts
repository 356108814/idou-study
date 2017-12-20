class MainUIController extends Controller {
	private mainUIView: MainUIView;

	public constructor() {
		super();
	}

	protected init() {
	}

	public initView(): View {
		this.mainUIView = new MainUIView();
		return this.mainUIView;
	}

	public addEventListener() {
		Core.Dispatcher.addListener(EventName.UI_MAIN_UI, this.onViewHandler)
	}

	public removeEventListener() {

	}
}