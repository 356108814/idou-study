/**
 * 游戏主场景
 */
class GameScene extends Scene {
	public constructor() {
		super();
	}

	public onEnter() {
		LayerManager.init();
		EventCenter.dispatch(new DataEvent(EventName.MODULE_SHOW, [ModuleName.MainUI, true]))
	}

	public onExit() {

	}
}