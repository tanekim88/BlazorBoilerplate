"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const snackbar_1 = require("@material/snackbar");
[].map.call(document.querySelectorAll('.mdc-snackbar'), function (el) {
    const snackbar = new snackbar_1.MDCSnackbar(el);
    // snackbar.open();
});
//# sourceMappingURL=index.js.map