import Tailwindcss from 'tailwindcss';

import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '@shared/src/functions/process-providers';
import fs from 'fs';
import path from 'path';
import {sharedPaths} from '@shared/paths';
const fileToRemove = sharedPaths['tailwind.config.json'].toAbsolutePath();
if(fs.existsSync(fileToRemove)){
    fs.unlinkSync(fileToRemove)
}


import tailwindConfig from '@shared/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig'
@CustomInjectable()
export class WebpackTailwindcssService extends WebpackPostcssBaseService {
    constructor() {
        super(Tailwindcss);
    }

    createOptions(options?: any): any {
        console.dir(tailwindConfig);
        const resolvedConfig =  resolveConfig(tailwindConfig);
        console.dir(resolvedConfig);
        return this.mergeService.mergeOptions(super.createOptions(), {
            config: resolvedConfig,
        });
    }
}
