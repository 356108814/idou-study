/**
 * 游戏主场景
 */
class GameScene extends Scene {
	public constructor() {
		super();
	}

	public onEnter() {
		LayerManager.init();
		Core.Dispatcher.dispatch(new DataEvent(EventName.UI_MAIN_UI, true))
	}

	public onExit() {

	}
}