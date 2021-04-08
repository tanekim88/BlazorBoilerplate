import deepmerge from 'deepmerge';
import tailwindcssElevation from 'tailwindcss-elevation';
import sharedConfig from '@shared/tailwind.config';
// const elevation = tailwindcssElevation(['responsive']);
// console.dir(tailwindcssElevation(['responsive']));

export default deepmerge(sharedConfig, {
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
