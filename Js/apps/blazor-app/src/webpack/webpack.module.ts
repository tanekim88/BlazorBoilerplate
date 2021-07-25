import { ModulesModule } from '@shared/src/modules/modules.module';
import { CustomModule } from '@shared/src/functions/process-providers';

import { WebpackModule } from '@shared/src/webpack/webpack.module';
import { BlazorAppModulesModule } from '../modules/modules.module';
import { BlazorAppWebpackPluginsModule } from './plugins/webpack-plugins.module';
import { BlazorAppWebpackRulesModule } from './rules/webpack-rules.module';

import { BlazorAppWebpackDevConfigService, BlazorAppWebpackDevService } from './webpack-dev/webpack-dev.service';
import { BlazorAppWebpackProdConfigService, BlazorAppWebpackProdService } from './webpack-prod/webpack-prod.service';
import { BlazorAppWebpackSharedConfigService } from './webpack-shared-config/webpack-shared-config.service';
import { BlazorAppWebpackSharedService } from './webpack-shared/webpack-shared.service';

@CustomModule({
    providers: [
        BlazorAppWebpackDevConfigService,
        BlazorAppWebpackProdConfigService,
        BlazorAppWebpackDevService,
        BlazorAppWebpackProdService,
        BlazorAppWebpackSharedConfigService,
        BlazorAppWebpackSharedService,
    ],
    imports: [
        BlazorAppWebpackPluginsModule,
        BlazorAppWebpackRulesModule,
        // blazorAppClientWebpackPostcssModule,
        // blazorAppClientWebpackMinimizersModule,
        BlazorAppModulesModule,
        WebpackModule,
    ],
})
export class BlazorAppWebpackModule {}
