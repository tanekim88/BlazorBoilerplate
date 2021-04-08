"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const top_app_bar_1 = require("@material/top-app-bar");
const selector = '.mdc-top-app-bar';
[].map.call(document.querySelectorAll(selector), function (el) {
    const topAppBar = new top_app_bar_1.MDCTopAppBar(el);
});
//# sourceMappingURL=index.js.map