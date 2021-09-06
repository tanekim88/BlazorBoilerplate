import './_index.scss';
import { MDCRipple } from '@material/ripple';
[].map.call(document.querySelectorAll('.mdc-icon-button'), function (el) {
    const iconButtonRipple = new MDCRipple(el);
    iconButtonRipple.unbounded = true;
});
//# sourceMappingURL=index.js.map