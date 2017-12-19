module mvc {
	export class DefaultController implements Controller {
		private view: View = null;
		private cache: Cache;
		private service: Service;

		public constructor() {
		}

		public init() {
		}

		public setView(view: View) {
			this.view = view;
		}

		public getView(): View {
			return this.view;
		}


		public setCache(cache: Cache) {
			this.cache = cache;
		}

		public getCache(): Cache {
			return this.cache;
		}

		public setService(service: Service) {
			this.service = service;
		}
		public getService(): Service {
			return this.service;
		}
	}
}