import deepmerge from 'deepmerge';
import tailwindcssElevation from 'tailwindcss-elevation';
import sharedConfig from '#shared/tailwind.config';
import path from 'path';
// const elevation = tailwindcssElevation(['responsive']);
// console.dir(tailwindcssElevation(['responsive']));


const purgePath = path.resolve( __dirname, './src/**/*.{js,jsx,ts,tsx,vue,html}');
const purgePath2 = path.resolve( __dirname, '../../../Apps/BlazorApp/Client/**/*.{razor}');

export default deepmerge(sharedConfig, {
    // future: {},
    // purge: [purgePath, purgePath2],
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
