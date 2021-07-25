import './_index.scss';
import { MDCRipple } from '@material/ripple';
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
    return new MDCRipple(el);
});
//# sourceMappingURL=index.js.map