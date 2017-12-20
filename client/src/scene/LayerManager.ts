/**
 * 层管理
 */
class LayerManager {

	/**
	 * 背景层
	 */
	public static bgLayer: SpriteLayer = new SpriteLayer();

	/**
	 * 地图层
	 */
	public static mapLayer: SpriteLayer = new SpriteLayer();

	/**
	 * 实体层。包含人物、怪物、技能等
	 */
	public static entityLayer: SpriteLayer = new SpriteLayer();

	/**
	 * 主界面层
	 */
	public static uiLayer: UILayer = new UILayer();

	/**
	 * 弹出窗层
	 */
	public static popupLayer: UILayer = new UILayer();

	/**
	 * 引导层
	 */
	public static guideLayer: UILayer = new UILayer();

	/**
	 * 消息提示层
	 */
	public static tipLayer: UILayer = new UILayer();

	public static init() {
		Global.stage.addChild(LayerManager.bgLayer);
		Global.stage.addChild(LayerManager.mapLayer);
		Global.stage.addChild(LayerManager.entityLayer);
		Global.stage.addChild(LayerManager.uiLayer);
		Global.stage.addChild(LayerManager.popupLayer);
		Global.stage.addChild(LayerManager.guideLayer);
		Global.stage.addChild(LayerManager.tipLayer);
	}
}