import { colors, texts } from '../../tailwind/tailwind.colors';
import { materialVariables } from './export';
// import { colorTypes } from './color-types';
// import { colorSchemes, colorsInput } from './colors-input';
// import { textColorSchemes } from './text-color-schemes';
// import { textsInput } from './texts-input';
const colorSchemes = materialVariables['$color-schemes'];
const textColorSchemes = materialVariables['$text-color-schemes'];
const colorTypes = materialVariables['$color-types'];
const colorsInput = materialVariables['$colors-input'];
const textsInput = materialVariables['$texts-input'];
console.dir(colors);
console.dir(texts);
const textC = texts;
export const sassVariables = {
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
    colors: colors,
    texts: texts,
    schema: {
        'texts-input': textsInput,
        'colors-input': colorsInput,
        'color-schemes': colorSchemes,
        'text-color-schemes': textColorSchemes,
        'color-types': colorTypes,
    },
};
//# sourceMappingURL=sass-variables.js.map