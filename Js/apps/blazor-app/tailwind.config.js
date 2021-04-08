import deepmerge from 'deepmerge';
// import tailwindcssElevation from 'tailwindcss-elevation';

// const elevation = tailwindcssElevation(['responsive']);
// console.dir(tailwindcssElevation(['responsive']));
import sharedConfig from '../../SharedLibrary/tailwind.config';
export default deepmerge(sharedConfig, {
    future: {},
    purge: [],
    theme: {
        // colors,
        extend: {
            // width: {},
        },
        // fontSize: {},
        // breakpoints: {},
        // lineHeight: {},
    },
    variants: {},
    plugins: [
        // require('tailwind-css-variables')(),
    ],
});
