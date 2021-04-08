"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./_index.scss");
const list_1 = require("@material/list");
const drawer_1 = require("@material/drawer");
const top_app_bar_1 = require("@material/top-app-bar");
const appBarEl = document.getElementById('app-bar');
const mainContentEl = document.getElementById('main-content');
if (mainContentEl && appBarEl) {
    const topAppBar = top_app_bar_1.MDCTopAppBar.attachTo(appBarEl);
    [].map.call(document.querySelectorAll('.mdc-drawer'), function (el) {
        const drawer = drawer_1.MDCDrawer.attachTo(el);
        topAppBar.setScrollTarget(mainContentEl);
        topAppBar.listen('MDCTopAppBar:nav', () => {
            drawer.open = !drawer.open;
        });
        [].map.call(el.querySelectorAll('.mdc-list'), function (el2) {
            const list = list_1.MDCList.attachTo(el2);
            list.wrapFocus = true;
            el2.addEventListener('click', (event) => {
                mainContentEl.querySelector('input, button').focus();
            });
        });
    });
    document.body.addEventListener('MDCDrawer:closed', () => {
        mainContentEl.querySelector('input, button').focus();
    });
}
// function init(ref, component) {
//     ref.matBlazorRef = new MDCDrawer(ref);
//     ref.addEventListener('MDCDrawer:closed', () => {
//         component.invokeMethodAsync('ClosedHandler');
//     });
// }
// function setOpened(ref, opened) {
//     ref.matBlazorRef.open = opened;
// }
// export const drawer = {
//     init,
//     setOpened,
// };
//# sourceMappingURL=index.js.map