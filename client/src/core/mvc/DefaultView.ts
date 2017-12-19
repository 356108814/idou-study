module mvc {
	export class DefaultView extends egret.Sprite implements View {
		private _parent: egret.DisplayObjectContainer = null;
		private _isShow: Boolean = false;

		public constructor(parent: egret.DisplayObjectContainer) {
			super();
			this._parent = parent;
			this.createView();
		}

		public createView() {

		}

		public show() {
			if (this._parent != null) {
				this._parent.addChild(this);
				this._isShow = true;
			}
		}

		public hide() {
			if (this.parent) {
				this.parent.removeChild(this);
				this._isShow = false;
			}
		}

		public isShow() {
			return this._isShow;
		}
	}
}