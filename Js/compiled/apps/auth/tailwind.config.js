"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge_1 = __importDefault(require("deepmerge"));
const tailwind_config_1 = __importDefault(require("@shared/tailwind.config"));
// const elevation = tailwindcssElevation(['responsive']);
// console.dir(tailwindcssElevation(['responsive']));
exports.default = deepmerge_1.default(tailwind_config_1.default, {
// future: {},
// purge: [],
// theme: {
//     extend: {
//         // width: {},
//     },
//     // fontSize: {},
//     // breakpoints: {},
//     // lineHeight: {},
// },
// variants: {},
// plugins: [],
});
//# sourceMappingURL=tailwind.config.js.map