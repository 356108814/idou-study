class LoadingUI extends View {

    public constructor() {
        super(Global.stage);
        this.createView();
    }

    private textField: egret.TextField;

    public createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    }

    public setProgress(current: number, total: number): void {
        this.textField.text = `Loading...${current}/${total}`;
    }
}
