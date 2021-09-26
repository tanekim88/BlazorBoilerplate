import './_index.scss';
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
[].map.call(document.querySelectorAll('.mdc-list'), function (el) {
    const list = new MDCList(el);
    const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
});
//# sourceMappingURL=index.js.map