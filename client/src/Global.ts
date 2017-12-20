class Global {
	public static stage: egret.Stage;
	public static game: Game;

	public static init(stage: egret.Stage) {
		Global.stage = stage;
		Global.game = new Game();
	}
}