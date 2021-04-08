"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const list_1 = require("@material/list");
const ripple_1 = require("@material/ripple");
[].map.call(document.querySelectorAll('.mdc-list'), function (el) {
    const list = new list_1.MDCList(el);
    const listItemRipples = list.listElements.map((listItemEl) => new ripple_1.MDCRipple(listItemEl));
});
//# sourceMappingURL=index.js.map