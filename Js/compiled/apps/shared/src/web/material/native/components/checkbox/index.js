"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const form_field_1 = require("@material/form-field");
const checkbox_1 = require("@material/checkbox");
const checkboxes = document.querySelectorAll('.mdc-checkbox');
[].forEach.call(checkboxes, function (checkbox) {
    const cbInstance = checkbox_1.MDCCheckbox.attachTo(checkbox);
    if (checkbox.parentElement.classList.contains('mdc-form-field')) {
        const ffInstance = form_field_1.MDCFormField.attachTo(checkbox.parentElement);
        ffInstance.input = cbInstance;
    }
});
//# sourceMappingURL=index.js.map