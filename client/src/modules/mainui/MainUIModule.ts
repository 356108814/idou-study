/**
 * 主界面视图
 */
class MainUIModule extends BaseModule {
	private textfield: egret.TextField;

	public constructor() {
		super();
	}

	public createView() {
		let sky = this.createBitmapByName("bg_jpg");
		this.addChild(sky);
		let stageW = Global.stage.stageWidth;
		let stageH = Global.stage.stageHeight;
		sky.width = stageW;
		sky.height = stageH;

		let topMask = new egret.Shape();
		topMask.graphics.beginFill(0x000000, 0.5);
		topMask.graphics.drawRect(0, 0, stageW, 172);
		topMask.graphics.endFill();
		topMask.y = 33;
		this.addChild(topMask);

		let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
		this.addChild(icon);
		icon.x = 26;
		icon.y = 33;

		let line = new egret.Shape();
		line.graphics.lineStyle(2, 0xffffff);
		line.graphics.moveTo(0, 0);
		line.graphics.lineTo(0, 117);
		line.graphics.endFill();
		line.x = 172;
		line.y = 61;
		this.addChild(line);


		let colorLabel = new egret.TextField();
		colorLabel.textColor = 0xffffff;
		colorLabel.width = stageW - 172;
		colorLabel.textAlign = "center";
		colorLabel.text = "Hello Egret";
		colorLabel.size = 24;
		colorLabel.x = 172;
		colorLabel.y = 80;
		this.addChild(colorLabel);

		let textfield = new egret.TextField();
		this.addChild(textfield);
		textfield.alpha = 0;
		textfield.width = stageW - 172;
		textfield.textAlign = egret.HorizontalAlign.CENTER;
		textfield.size = 24;
		textfield.textColor = 0xffffff;
		textfield.x = 172;
		textfield.y = 135;
		this.textfield = textfield;

		//根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
		// Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
		RES.getResAsync("description_json", this.startAnimation, this);

		let button = new eui.Button();
		button.label = "Click!";
		button.horizontalCenter = 0;
		button.verticalCenter = 0;
		this.addChild(button);
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
	}

	/**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
	private createBitmapByName(name: string): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
	private startAnimation(result: Array<any>): void {
		let parser = new egret.HtmlTextParser();

		let textflowArr = result.map(text => parser.parse(text));
		let textfield = this.textfield;
		let count = -1;
		let change = () => {
			count++;
			if (count >= textflowArr.length) {
				count = 0;
			}
			let textFlow = textflowArr[count];

			// 切换描述内容
			// Switch to described content
			textfield.textFlow = textFlow;
			let tw = egret.Tween.get(textfield);
			tw.to({ "alpha": 1 }, 200);
			tw.wait(2000);
			tw.to({ "alpha": 0 }, 200);
			tw.call(change, this);
		};

		change();
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