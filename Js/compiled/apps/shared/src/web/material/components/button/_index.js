"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const ripple_1 = require("@material/ripple");
[].map.call(document.querySelectorAll('.mdc-button'), function (el) {
    const menu = new ripple_1.MDCRipple(el);
});
//# sourceMappingURL=_index.js.map