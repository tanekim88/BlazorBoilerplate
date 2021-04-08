import './_index.scss';
import { MDCMenu } from '@material/menu';

const selector = '.mdc-menu';
[].map.call(document.querySelectorAll(selector), function (el) {
    const menu = new MDCMenu(el);
    menu.open = true;
});
