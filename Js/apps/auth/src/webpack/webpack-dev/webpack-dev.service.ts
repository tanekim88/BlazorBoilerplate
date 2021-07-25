import { CustomInjectable } from '@shared/src/functions/process-providers';
import { CustomInject } from '@shared/src/functions/process-providers';
import { WebpackDevService } from '@shared/src/webpack/webpack-dev/webpack-dev.service';
import { AuthWebpackSharedConfigService } from '../webpack-shared-config/webpack-shared-config.service';
import { AuthWebpackSharedService } from '../webpack-shared/webpack-shared.service';

@CustomInjectable()
class AuthWebpackDevBaseService extends WebpackDevService {
    createConfiguration(options?) {
        return this.mergeService.mergeOptions(super.createConfiguration(), {}, options);
    }
}

export class AuthWebpackDevConfigService extends AuthWebpackDevBaseService {
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
export class AuthWebpackDevService extends AuthWebpackDevBaseService {
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
