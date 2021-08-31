import deepmerge from 'deepmerge';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const plugin = require('tailwindcss/plugin');
const plugin = require('tailwindcss/plugin');
import { materialVariables } from './src/web/material/variables/export';
import { tailwindColors } from './src/web/tailwind/tailwind.colors';
import path from 'path';
const colorsInput = materialVariables['$colors-input'];
const materialColors = materialVariables['$material-colors'];
const subTypes = materialVariables['$sub-types'];
const textColorSchemes = materialVariables['$text-color-schemes'];
const textsInput = materialVariables['$text-input'];
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
console.dir(tailwindColors);
// console.dir(colorsUtilities);
// console.dir(textColors);
const purgePath = path.resolve(__dirname, './src/**/*.{js,jsx,ts,tsx,html,cshtml}');
export default deepmerge({}, {
    // mode:'jit',
    // important: true,
    // purge: [
    //     purgePath,
    // ],
    theme: {
        extend: {
            colors: deepmerge(tailwindColors, defaultColors),
        },
        // fontSize: {},
        // breakpoints: {},
        // lineHeight: {},
    },
    variants: ['responsive', 'important'],
    plugins: [
        // tailwindImportant(),
        // tailwindcssElevation(['responsive'], {
        //     // color: '77,192,181',
        //     // opacityBoost: '0.23'
        // }),
        plugin(function ({ addVariant, e }) {
            addVariant('important', ({ container }) => {
                container.walkRules(rule => {
                    rule.selector = `.\\!${rule.selector.slice(1)}`;
                    rule.walkDecls(decl => {
                        decl.important = true;
                    });
                });
            });
            // addUtilities(colorsUtilities);
        }),
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