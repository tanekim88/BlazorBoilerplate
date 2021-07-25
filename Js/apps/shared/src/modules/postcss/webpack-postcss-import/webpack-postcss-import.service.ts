import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import PostcssImport from 'postcss-import';

import { EnvironmentService } from '../../../modules/environment/environment/environment.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
@CustomInjectable()
export class WebpackPostcssImportService extends WebpackPostcssBaseService {
    constructor() {
        super(PostcssImport);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                // addModulesDirectories: [this.environmentService.environments.localEnvironment.absolutePaths.nodeModules_],
                // resolve: (id, base, webpackOptions) => {
                //   return postcssImportResolve(id, base, webpackOptions);
                // }
            },
            options,
        );
    }
}
