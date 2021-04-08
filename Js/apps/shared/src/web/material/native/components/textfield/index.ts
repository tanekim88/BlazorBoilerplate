import './_index.scss';
import { MDCTextField } from '@material/textfield';

// const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
    return new MDCTextField(el);
});
