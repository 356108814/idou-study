class Main extends eui.UILayer {

    protected createChildren(): void {
        super.createChildren();
        Global.init(this.stage);
        Global.game.runScene(new LoadingScene());
    }
}
