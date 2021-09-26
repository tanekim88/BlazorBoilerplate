"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sassVariables = void 0;
const tailwind_colors_1 = require("../../tailwind/tailwind.colors");
const export_1 = require("./export");
// import { colorTypes } from './color-types';
// import { colorSchemes, colorsInput } from './colors-input';
// import { textColorSchemes } from './text-color-schemes';
// import { textsInput } from './texts-input';
const colorSchemes = export_1.materialVariables['$color-schemes'];
const textColorSchemes = export_1.materialVariables['$text-color-schemes'];
const colorTypes = export_1.materialVariables['$color-types'];
const colorsInput = export_1.materialVariables['$colors-input'];
const textsInput = export_1.materialVariables['$texts-input'];
console.dir(tailwind_colors_1.colors);
console.dir(tailwind_colors_1.texts);
const textC = tailwind_colors_1.texts;
exports.sassVariables = {
    base: '16px',
    spacing: '1rem',
    breakpoints: {
        xs: '0em' /* 0px */,
        sm: '30em' /* 480px */,
        md: '64em' /* 1024px */,
        lg: '75em' /* 1200px */,
    },
    typography: {
        font: "'Open Sans', sans-serif",
        text: '1rem',
        title: '2rem',
    },
    colors: tailwind_colors_1.colors,
    texts: tailwind_colors_1.texts,
    schema: {
        'texts-input': textsInput,
        'colors-input': colorsInput,
        'color-schemes': colorSchemes,
        'text-color-schemes': textColorSchemes,
        'color-types': colorTypes,
    },
};
//# sourceMappingURL=sass-variables.js.map