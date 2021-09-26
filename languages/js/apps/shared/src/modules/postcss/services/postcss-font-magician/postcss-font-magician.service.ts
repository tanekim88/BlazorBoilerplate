import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import PostcssFontMagician from 'postcss-font-magician';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class PostcssFontMagicianService extends PostcssBaseService {
    constructor() {
        super(PostcssFontMagician);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                //protocol: 'https:',
                //formats: 'woff2 woff', // By default, local, woff2, woff, and eot are enabled. Supported formats include local, woff2, woff, ttf, eot, svg, and otf.
                //async: 'path/to/your-fonts-async-loader.js',
                //hosted: ['./src/fonts', /custom/path / to / fonts / on / site],
                //display: 'swap',
                //foundries: 'bootstrap google',
                aliases: {
                    'sans-serif': 'Sans Serif',
                },
                variants: {
                    'Open Sans': {
                        '300': ['woff, eot, woff2'],
                        '300 italic': ['woff2'],
                        '400': [],
                        '400 italic': [],
                        '600': [],
                        '600 italic': [],
                        '700': [],
                        '700 italic': [],
                    },
                },
                foundries: ['google'],
            },
            options,
        );
    }
}
