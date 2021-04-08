import { WebpackDevService } from './webpack-dev/webpack-dev.service';
import { WebpackProdService } from './webpack-prod/webpack-prod.service';
import { WebpackSharedBaseService } from './webpack-shared-base/webpack-shared-base.service';
import { WebpackMinimizersModule } from './minimizers/webpack-minimizers.module';
import { WebpackPluginsModule } from './plugins/webpack-plugins.module';
import { WebpackPostcssModule } from './postcss/webpack-postcss.module';
import { WebpackRulesModule } from './rules/webpack-rules.module';
import { ModulesModule } from '../modules/modules.module';
import { WebpackBaseService } from './webpack-base/webpack-base.service';
import { CustomModule } from '../functions/process-webpack-providers';

import { WebpackSharedConfigService } from './webpack-shared-config/webpack-shared-config.service';

import { WebpackSharedService } from './webpack-shared/webpack-shared.service';
import { WebpackSharedAspnetcoreService } from './webpack-shared-aspnetcore/webpack-shared-aspnetcore.service';


@CustomModule({
    imports: [ModulesModule, WebpackMinimizersModule, WebpackPluginsModule, WebpackPostcssModule, WebpackRulesModule],
    providers: [
        WebpackBaseService,
        WebpackDevService,
        WebpackProdService,
        WebpackSharedBaseService,
        WebpackSharedConfigService,
        WebpackSharedService,
        WebpackSharedAspnetcoreService,
    ],
})
export class WebpackModule {}
