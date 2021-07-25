import { WebpackProdService } from '@shared/src/webpack/webpack-prod/webpack-prod.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
import { BlazorAppWebpackSharedConfigService } from '../webpack-shared-config/webpack-shared-config.service';
import { BlazorAppWebpackSharedService } from '../webpack-shared/webpack-shared.service';

@CustomInjectable()
class BlazorAppWebpackProdBaseService extends WebpackProdService {
    createConfiguration(options?) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
}

export class BlazorAppWebpackProdConfigService extends BlazorAppWebpackProdBaseService {
    @CustomInject(BlazorAppWebpackSharedConfigService)
    protected blazorAppClientWebpackSharedConfigService: BlazorAppWebpackSharedConfigService;

    createConfiguration(options?) {
        return this.mergeService.mergeOptions(
            this.blazorAppClientWebpackSharedConfigService.createConfiguration(),
            super.createConfiguration(),
            {},
            options,
        );
    }
}
export class BlazorAppWebpackProdService extends BlazorAppWebpackProdBaseService {
    @CustomInject(BlazorAppWebpackSharedService)
    protected blazorAppClientWebpackSharedService: BlazorAppWebpackSharedService;

    createConfiguration(options?) {
        return this.mergeService.mergeOptions(
            this.blazorAppClientWebpackSharedService.createConfiguration(),
            super.createConfiguration(),
            {},
            options,
        );
    }
}
