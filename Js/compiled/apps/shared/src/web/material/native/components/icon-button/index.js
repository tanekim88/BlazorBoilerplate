"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const ripple_1 = require("@material/ripple");
[].map.call(document.querySelectorAll('.mdc-icon-button'), function (el) {
    const iconButtonRipple = new ripple_1.MDCRipple(el);
    iconButtonRipple.unbounded = true;
});
//# sourceMappingURL=index.js.map