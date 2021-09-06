import './_index.scss';

import { MDCList } from '@material/list';
import { MDCDrawer } from '@material/drawer';
import { MDCTopAppBar } from '@material/top-app-bar';

const appBarEl = document.getElementById('app-bar');

const mainContentEl = document.getElementById('main-content');

if (mainContentEl && appBarEl) {
    const topAppBar = MDCTopAppBar.attachTo(appBarEl);
    [].map.call(document.querySelectorAll('.mdc-drawer'), function (el) {
        const drawer = MDCDrawer.attachTo(el);
        topAppBar.setScrollTarget(mainContentEl);
        topAppBar.listen('MDCTopAppBar:nav', () => {
            drawer.open = !drawer.open;
        });

        [].map.call(el.querySelectorAll('.mdc-list'), function (el2) {
            const list = MDCList.attachTo(el2);
            list.wrapFocus = true;
            el2.addEventListener('click', (event) => {
                (mainContentEl.querySelector('input, button') as any).focus();
            });
        });
    });

    document.body.addEventListener('MDCDrawer:closed', () => {
        (mainContentEl.querySelector('input, button') as any).focus();
    });
}

// function init(ref, component) {
//     ref.matSolidRef = new MDCDrawer(ref);
//     ref.addEventListener('MDCDrawer:closed', () => {
//         component.invokeMethodAsync('ClosedHandler');
//     });
// }

// function setOpened(ref, opened) {
//     ref.matSolidRef.open = opened;
// }

// export const drawer = {
//     init,
//     setOpened,
// };
