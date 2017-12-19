// TypeScript file

module mvc {
    export interface Controller {
        init();
        setView(view: View);
        getView(): View;
        setCache(cache: Cache);
        getCache(): Cache;
        setService(service: Service);
        getService(): Service;
    }
}
