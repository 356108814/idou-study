class Log {
    private static isDebug: Boolean = true;

    public static debug(...optionalParams: any[]): void {
        if (Log.isDebug) {
            optionalParams[0] = "[Debug]" + optionalParams[0];
            console.log.apply(console, optionalParams);
        }
    }
}