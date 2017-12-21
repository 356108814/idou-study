/**
 * 加载页场景
 */
class LoadingScene extends Scene {
	private isThemeLoadEnd: boolean = false;
	private isResourceLoadEnd: boolean = false;

	public constructor() {
		super();
	}

	public onEnter() {
		EventCenter.dispatch(new DataEvent(EventName.MODULE_SHOW, [ModuleName.Loading, true]));
		this.loadResource();
	}

	public onExit() {
		EventCenter.dispatch(new DataEvent(EventName.MODULE_SHOW, [ModuleName.Loading, false]));
	}

	/**
	 * 加载资源。先加载配置，再加载资源组
	 */
	private loadResource() {
		//注入自定义的素材解析器
		let assetAdapter = new AssetAdapter();
		egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
		egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
		//初始化Resource资源加载库
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.loadConfig("resource/default.res.json", "resource/");
	}

	/**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
	private onConfigComplete(event: RES.ResourceEvent): void {
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
		let theme = new eui.Theme("resource/default.thm.json", Global.stage);
		theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		RES.loadGroup("preload");
	}


    /**
     * 主题文件加载完成,开始预加载
     */
	private onThemeLoadComplete(): void {
		this.isThemeLoadEnd = true;
		this.runGameScene();
	}

    /**
     * preload资源组加载完成
     */
	private onResourceLoadComplete(event: RES.ResourceEvent): void {
		if (event.groupName == "preload") {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
			this.isResourceLoadEnd = true;
			this.runGameScene();
		}
	}

	/**
     * 资源组加载出错
     */
	private onItemLoadError(event: RES.ResourceEvent): void {
		console.warn("Url:" + event.resItem.url + " has failed to load");
	}

    /**
     * 资源组加载出错
     */
	private onResourceLoadError(event: RES.ResourceEvent): void {
		//TODO
		console.warn("Group:" + event.groupName + " has failed to load");
		//忽略加载失败的项目
		this.onResourceLoadComplete(event);
	}

    /**
     * preload资源组加载进度
     */
	private onResourceProgress(event: RES.ResourceEvent): void {
		if (event.groupName == "preload") {
			EventCenter.dispatch(new DataEvent(EventName.LOADING_PROGRESS, [event.itemsLoaded, event.itemsTotal]));
		}
	}

	private runGameScene() {
		if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
			Global.game.runScene(new GameScene());
		}
	}
}