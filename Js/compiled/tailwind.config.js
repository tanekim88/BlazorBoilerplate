"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tailwind_config_1 = __importDefault(require("@shared/tailwind.config"));
const deepmerge_1 = __importDefault(require("deepmerge"));
exports.default = deepmerge_1.default(tailwind_config_1.default, {
    future: {},
    purge: [],
    theme: {
        // colors,
        extend: {},
    },
    variants: {},
    plugins: [],
});
//# sourceMappingURL=tailwind.config.js.map