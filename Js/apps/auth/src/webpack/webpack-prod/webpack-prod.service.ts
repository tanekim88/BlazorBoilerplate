import { WebpackProdService } from '#shared/src/webpack/webpack-prod/webpack-prod.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';
import { CustomInject } from '#shared/src/functions/process-providers';
import { AuthWebpackSharedConfigService } from '../webpack-shared-config/webpack-shared-config.service';
import { AuthWebpackSharedService } from '../webpack-shared/webpack-shared.service';

@CustomInjectable()
class AuthWebpackProdBaseService extends WebpackProdService {
    createConfiguration(options?) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
}

export class AuthWebpackProdConfigService extends AuthWebpackProdBaseService {
    @CustomInject(AuthWebpackSharedConfigService)
    protected authWebpackSharedConfigService: AuthWebpackSharedConfigService;

    createConfiguration(options?) {
        return this.mergeService.mergeOptions(
            this.authWebpackSharedConfigService.createConfiguration(),
            super.createConfiguration(),
            {},
            options,
        );
    }
}
export class AuthWebpackProdService extends AuthWebpackProdBaseService {
    @CustomInject(AuthWebpackSharedService)
    protected authWebpackSharedService: AuthWebpackSharedService;

    createConfiguration(options?) {
        return this.mergeService.mergeOptions(
            this.authWebpackSharedService.createConfiguration(),
            super.createConfiguration(),
            {},
            options,
        );
    }
}
