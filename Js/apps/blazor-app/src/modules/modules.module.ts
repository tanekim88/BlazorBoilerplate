import { CustomModule } from '#shared/src/functions/process-providers';
import { PostcssModule } from '#shared/src/modules/postcss/postcss.module';
import { BlazorAppEnvironmentModule } from './environment/environment.module';

import { BlazorAppUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [BlazorAppUtilitiesModule, BlazorAppEnvironmentModule, PostcssModule],
})
export class BlazorAppModulesModule {}
