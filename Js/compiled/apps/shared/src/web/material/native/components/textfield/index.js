"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const textfield_1 = require("@material/textfield");
// const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
    return new textfield_1.MDCTextField(el);
});
//# sourceMappingURL=index.js.map