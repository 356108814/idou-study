/**
 * 游戏入口
 */
class Game {
	private net: Net;
	private scene: Scene;

	public constructor() {
		this.init();
	}

	public init() {
		//本地、远程事件消息监听
		EventCenter.init();

		//初始化服务器通信
		this.net = new Net();

		//服务器消息监听
		MessageCenter.init();

		//生命周期
		this.initLifecycle();

		//初始化controller管理器
		ControllerManager.instance().init();
	}

	/**
	 * 运行场景
	 */
	public runScene(scene: Scene) {
		if (this.scene != null && this.scene != scene) {
			this.scene.onExit();
		}
		scene.loadRes();
		scene.onEnter();
		this.scene = scene;
	}

	public getNet(): Net {
		return this.net;
	}

	private initLifecycle() {
		egret.lifecycle.addLifecycleListener((context) => {
			// custom lifecycle plugin
		})

		egret.lifecycle.onPause = () => {
			egret.ticker.pause();
		}

		egret.lifecycle.onResume = () => {
			egret.ticker.resume();
		}
	}
}