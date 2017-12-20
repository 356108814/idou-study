/**
 * 游戏入口
 */
class Game {
	private server: core.Server;
	private scene: Scene;

	public constructor() {
		this.init();
	}

	public init() {
		//初始化服务器
		this.server = new core.Server();
		this.server.initServer();
		//本地、远程事件消息监听

		//
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