import { ModulesModule } from '@shared/src/modules/modules.module';
import { CustomModule } from '@shared/src/functions/process-providers';

import { WebpackModule } from '@shared/src/webpack/webpack.module';
import { AuthModulesModule } from '../modules/modules.module';
import { AuthWebpackPluginsModule } from './plugins/webpack-plugins.module';
import { AuthWebpackRulesModule } from './rules/webpack-rules.module';

import { AuthWebpackDevConfigService, AuthWebpackDevService } from './webpack-dev/webpack-dev.service';
import { AuthWebpackProdConfigService, AuthWebpackProdService } from './webpack-prod/webpack-prod.service';
import { AuthWebpackSharedConfigService } from './webpack-shared-config/webpack-shared-config.service';
import { AuthWebpackSharedService } from './webpack-shared/webpack-shared.service';

@CustomModule({
    providers: [
        AuthWebpackDevConfigService,
        AuthWebpackProdConfigService,
        AuthWebpackDevService,
        AuthWebpackProdService,
        AuthWebpackSharedConfigService,
        AuthWebpackSharedService,
    ],
    imports: [
        AuthWebpackPluginsModule,
        AuthWebpackRulesModule,
        // authWebpackPostcssModule,
        // authWebpackMinimizersModule,
        AuthModulesModule,
        WebpackModule,
    ],
})
export class AuthWebpackModule {}
