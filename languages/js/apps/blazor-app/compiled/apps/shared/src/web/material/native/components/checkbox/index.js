import './_index.scss';
import { MDCFormField } from '@material/form-field';
import { MDCCheckbox } from '@material/checkbox';
const checkboxes = document.querySelectorAll('.mdc-checkbox');
[].forEach.call(checkboxes, function (checkbox) {
    const cbInstance = MDCCheckbox.attachTo(checkbox);
    if (checkbox.parentElement.classList.contains('mdc-form-field')) {
        const ffInstance = MDCFormField.attachTo(checkbox.parentElement);
        ffInstance.input = cbInstance;
    }
});
//# sourceMappingURL=index.js.map