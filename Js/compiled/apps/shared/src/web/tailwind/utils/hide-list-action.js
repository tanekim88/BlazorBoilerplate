"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideListAction = void 0;
function hideListAction(node, cb) {
    const onWindowClick = (e) => {
        if (!node.contains(e.target)) {
            cb();
        }
    };
    window.addEventListener('click', onWindowClick);
    return {
        destroy: () => {
            window.removeEventListener('click', onWindowClick);
        },
    };
}
exports.hideListAction = hideListAction;
//# sourceMappingURL=hide-list-action.js.map