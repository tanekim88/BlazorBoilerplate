"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge_1 = __importDefault(require("deepmerge"));
const export_1 = require("./src/web/material/variables/export");
const tailwind_colors_1 = require("./src/web/tailwind/tailwind.colors");
const path_1 = __importDefault(require("path"));
const colorsInput = export_1.materialVariables['$colors-input'];
const materialColors = export_1.materialVariables['$material-colors'];
const subTypes = export_1.materialVariables['$sub-types'];
const textColorSchemes = export_1.materialVariables['$text-color-schemes'];
const textsInput = export_1.materialVariables['$text-input'];
const defaultColors = {
// primary: '#b027b0',
// secondary: '#009688',
// error: '#f44336',
// success: '#4caf50',
// alert: '#ff9800',
// blue: '#2196f3',
// dark: '#212121',
// These are material palette colors. You should keep only colors that you're using.
// red: "#f44336",
// pink: "#e91e63",
// purple: "#9c27b0",
// "deep-purple": "#673ab7",
// indigo: "#3f51b5",
// blue: "#2196f3",
// "light-blue": "#03a9f4",
// cyan: "#00bcd4",
// teal: "#009688",
// green: "#4caf50",
// "light-green": "#8bc34a",
// lime: "#cddc39",
// yellow: "#ffeb3b",
// amber: "#ffc107",
// orange: "#ff9800",
// "deep-orange": "#ff5722",
// brown: "#795548"
};
console.dir(tailwind_colors_1.tailwindColors);
// console.dir(colorsUtilities);
// console.dir(textColors);
const purgePath = path_1.default.resolve(__dirname, './src/**/*.{js,jsx,ts,tsx,vue,html}');
exports.default = deepmerge_1.default({}, {
    mode: 'jit',
    // important: true,
    purge: [
        purgePath
    ],
    theme: {
        extend: {
            colors: deepmerge_1.default(tailwind_colors_1.tailwindColors, defaultColors),
        },
    },
    // variants: {
    //     borderRadius: ['responsive', 'important']
    // },
    plugins: [
    // tailwindcssElevation(['responsive'], {
    //     // color: '77,192,181',
    //     // opacityBoost: '0.23'
    // }),
    // plugin(function ({ addBase, config }) {
    //     addBase({
    //         h1: { fontSize: config('theme.fontSize.3xl') },
    //         h2: { fontSize: config('theme.fontSize.2xl') },
    //         h3: { fontSize: config('theme.fontSize.xl') },
    //         h4: { fontSize: config('theme.fontSize.lg') },
    //     });
    // }),
    ],
});
//# sourceMappingURL=tailwind.config.js.map