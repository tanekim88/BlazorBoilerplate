"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge_1 = __importDefault(require("deepmerge"));
const tailwind_config_1 = __importDefault(require("@shared/tailwind.config"));
const path_1 = __importDefault(require("path"));
// const elevation = tailwindcssElevation(['responsive']);
// console.dir(tailwindcssElevation(['responsive']));
const purgePath = path_1.default.resolve(__dirname, './src/**/*.{js,jsx,ts,tsx,vue,html}');
exports.default = deepmerge_1.default(tailwind_config_1.default, {
    // future: {},
    purge: [purgePath],
});
//# sourceMappingURL=tailwind.config.js.map