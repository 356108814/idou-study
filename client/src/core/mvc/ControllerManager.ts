module mvc {
	export class ControllerManager {
		private static _instance: ControllerManager = null;
		private controllers: { [id: number]: Controller } = {}

		private constructor() {
		}

		public static instance(): ControllerManager {
			if (this._instance == null) {
				this._instance = new ControllerManager();
			}
			return this._instance;
		}

		public register(id: number, controller: Controller) {
			controller.init();
			this.controllers[id] = controller;
		}

		public unregister(id: number) {
			let controller = this.controllers[id];
			if (controller != null) {
				delete this.controllers[id];
			}
		}
	}
}