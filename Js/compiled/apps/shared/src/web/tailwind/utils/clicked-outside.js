"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("svelte/store");
function clickedOutside() {
    if (!window)
        return store_1.writable(false);
    const store = store_1.writable(false);
    return {
        subscribe: store.subscribe,
        action: function (node) {
            const onClick = ({ target }) => store.set(!node.contains(target));
            window.addEventListener('click', onClick);
            return {
                destroy: () => window.removeEventListener('click', onClick),
            };
        },
    };
}
exports.default = clickedOutside;
//# sourceMappingURL=clicked-outside.js.map