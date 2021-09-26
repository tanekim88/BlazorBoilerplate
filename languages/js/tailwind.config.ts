import sharedConfig from '@projects/shared/tailwind.config';
import deepmerge from 'deepmerge';

export default deepmerge(sharedConfig, {
    future: {},
    purge: [],
    theme: {
        // colors,
        extend: {},
        // fontSize: {},
        // breakpoints: {},
        // lineHeight: {},
    },
    variants: {},
    plugins: [],
});
