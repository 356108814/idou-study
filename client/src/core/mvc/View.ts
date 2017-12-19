// TypeScript file

module mvc {
    export interface View {
        /**
         * 初始化视图
         */
        createView();
        show();
        hide();
        isShow();
    }
}