import deepmerge from 'deepmerge';
import tailwindcssElevation from 'tailwindcss-elevation';
import sharedConfig from '@shared/tailwind.config';
import path from 'path';
// const elevation = tailwindcssElevation(['responsive']);
// console.dir(tailwindcssElevation(['responsive']));


const purgePath = path.resolve( __dirname, './src/**/*.{js,jsx,ts,tsx,vue,html}');


export default deepmerge(sharedConfig, {
    // future: {},
    purge: [purgePath],
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
