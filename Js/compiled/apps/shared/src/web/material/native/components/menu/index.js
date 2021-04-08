"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const menu_1 = require("@material/menu");
const selector = '.mdc-menu';
[].map.call(document.querySelectorAll(selector), function (el) {
    const menu = new menu_1.MDCMenu(el);
    menu.open = true;
});
//# sourceMappingURL=index.js.map