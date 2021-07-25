import './_index.scss';
import { MDCRipple } from '@material/ripple';
[].map.call(document.querySelectorAll('.mdc-button'), function (el) {
    const menu = new MDCRipple(el);
});
//# sourceMappingURL=_index.js.map