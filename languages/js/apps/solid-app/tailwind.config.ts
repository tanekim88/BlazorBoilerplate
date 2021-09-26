import deepmerge from 'deepmerge';
import tailwindcssElevation from 'tailwindcss-elevation';
import sharedConfig from '@projects/shared/tailwind.config';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// const elevation = tailwindcssElevation(['responsive']);
// console.dir(tailwindcssElevation(['responsive']));
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const purgePath = path.resolve( __dirname, './src/**/*.{js,jsx,ts,tsx,vue,html}');
const purgePath2 = path.resolve( __dirname, '../../../Apps/SolidApp/Client/**/*.{razor}');

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
