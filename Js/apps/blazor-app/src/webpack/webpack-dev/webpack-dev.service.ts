import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { CustomInject } from '@shared/src/functions/process-webpack-providers';
import { WebpackDevService } from '@shared/src/webpack/webpack-dev/webpack-dev.service';
import { BlazorAppWebpackSharedConfigService } from '../webpack-shared-config/webpack-shared-config.service';
import { BlazorAppWebpackSharedService } from '../webpack-shared/webpack-shared.service';

@CustomInjectable()
class BlazorAppWebpackDevBaseService extends WebpackDevService {
    createConfiguration(options?) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
}

export class BlazorAppWebpackDevConfigService extends BlazorAppWebpackDevBaseService {
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
export class BlazorAppWebpackDevService extends BlazorAppWebpackDevBaseService {
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
