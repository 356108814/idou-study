/**
 * UI组件工厂
 */
class UIFactory {

	public static createGTextField(text:string, x: number, y: number, width: number = 150, height: number = 20, fontSize: number = 12, fontColor: number = 0xFFFFFF, textAlign?: string, verticalAlign?: string): GTextField {
		let textField: GTextField = new GTextField();
		textField.text = text;
		textField.x = x;
		textField.y = y;
		textField.width = width;
		textField.height = height;
		textField.size = fontSize;
		textField.textColor = fontColor;
		if(textAlign) {
			textField.textAlign = textAlign;
		}
		if(verticalAlign) {
			textField.verticalAlign = verticalAlign;
		}
		return textField;
	}

	public static createGBitmap(name: string): GBitmap {
		return new GBitmap(name);
	}

	public static createGImage(url: string): GImage {
		return new GImage(url);
	}
}