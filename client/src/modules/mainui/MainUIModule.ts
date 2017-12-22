/**
 * 主界面视图
 */
class MainUIModule extends BaseModule {
	private textfield: egret.TextField;

	public constructor() {
		super();
	}

	public createView() {
		let bg = UIFactory.createGBitmap("bg3_jpg");
		this.addChild(bg);
		let stageW = Global.stage.stageWidth;
		let stageH = Global.stage.stageHeight;

		// let topMask = new egret.Shape();
		// topMask.graphics.beginFill(0x000000, 0.5);
		// topMask.graphics.drawRect(0, 0, stageW, 172);
		// topMask.graphics.endFill();
		// topMask.y = 33;
		// this.addChild(topMask);

		// let button = new eui.Button();
		// button.label = "Click!";
		// button.horizontalCenter = 0;
		// button.verticalCenter = 0;
		// this.addChild(button);
		// button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

		//字
		let wordTextField = new egret.TextField();
		wordTextField.touchEnabled = true;
		wordTextField.text = "豆";
		wordTextField.bold = true;
		wordTextField.textColor = 0x000000;
		wordTextField.size = 200;
		wordTextField.width = stageW;
		wordTextField.height = stageH;
		wordTextField.textAlign = egret.HorizontalAlign.CENTER;
		wordTextField.verticalAlign = egret.VerticalAlign.MIDDLE;
		wordTextField.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
		this.addChild(wordTextField);

		var tw = egret.Tween.get(wordTextField, { loop: true });
		tw.to({ x: 300 }, 1000);

		var data = RES.getRes("congratulation_json");
		var txtr = RES.getRes("congratulation_png");
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("青蛙恭喜"));
		mc1.x = 100;
		mc1.y = 100;
		this.addChild(mc1);
		mc1.play(-1);
	}

	private onTouchTapHandler(e: egret.TouchEvent) {
		let word = (e.target as GTextField).text;
		Log.debug(word);
		var sound: egret.Sound = RES.getRes("文_mp3");
		sound.play(0, 1);
	}

    /**
     * 点击按钮
     * Click the button
     */
	private onButtonClick(e: egret.TouchEvent) {
		let panel = new eui.Panel();
		panel.title = "Title";
		panel.horizontalCenter = 0;
		panel.verticalCenter = 0;
		this.addChild(panel);


		// Core.server.send("aaaaaaaaaaa");

		// let data = RES.getRes("user_proto");
		// var message = dcodeIO.ProtoBuf.loadProto(data);

		// var User = message.build("User");

		// //创建一条消息
		// var user = new User({
		//     "username": "a",
		//     "password": "b"
		// });

		// var arraybuffer = user.toArrayBuffer();
		// var buf = new egret.ByteArray(arraybuffer);
		// //创建ByteArray数组用来保存消息对象并发送到网络
		// var byteArray = new egret.ByteArray();
		// //写入消息体
		// byteArray.writeBytes(new egret.ByteArray(arraybuffer));
		// Core.server.send(byteArray);
	}
}