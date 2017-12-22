/**
 * 加载页
 */
class LoadingModule extends BaseModule {

    public constructor() {
        super(Global.stage);
    }

    private textField: egret.TextField;

    public createView(): void {

        this.textField = UIFactory.createGTextField("", 0, 0, Global.stage.stageWidth, Global.stage.stageHeight);
        this.textField.textAlign = "center";
        this.textField.verticalAlign = "middle";
        this.addChild(this.textField);

    }

    public setProgress(current: number, total: number): void {
        this.textField.text = `Loading...${current}/${total}`;
    }

}
