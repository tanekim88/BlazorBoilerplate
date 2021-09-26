import Tailwindcss from 'tailwindcss';

import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import fs from 'fs';
import path from 'path';
import {sharedPaths} from '@projects/shared/paths';
const fileToRemove = sharedPaths['tailwind.config.json'].toAbsolutePath();
if(fs.existsSync(fileToRemove)){
    fs.unlinkSync(fileToRemove)
}


import tailwindConfig from '@projects/shared/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig'
@CustomInjectable()
export class TailwindcssService extends PostcssBaseService {
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
