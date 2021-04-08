"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const ripple_1 = require("@material/ripple");
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
    return new ripple_1.MDCRipple(el);
});
//# sourceMappingURL=index.js.map