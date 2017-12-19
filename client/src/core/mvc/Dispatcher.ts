module mvc {
	export class Dispatcher {
		private listeners: { [type: string]: Function[] } = {};

		public constructor() {
		}

		public dispatch(event: DataEvent) {
			let type = event.type;
			let handlers = this.listeners[type];
			if(handlers) {
				for (let handler of handlers) {
					handler.apply(event);
				}
			}
		}

		public addListener(type: string, handler: Function) {
			if (this.listeners[type] == null) {
				this.listeners[type] = [];
			}
			this.listeners[type].push(handler);
		}

		public hasListener(type: string) {
			let a = this.listeners[type];
			return a != null && a.length > 0;
		}
	}
}