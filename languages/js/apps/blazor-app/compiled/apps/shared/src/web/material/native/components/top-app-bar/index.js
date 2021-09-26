import './_index.scss';
import { MDCTopAppBar } from '@material/top-app-bar';
const selector = '.mdc-top-app-bar';
[].map.call(document.querySelectorAll(selector), function (el) {
    const topAppBar = new MDCTopAppBar(el);
});
//# sourceMappingURL=index.js.map