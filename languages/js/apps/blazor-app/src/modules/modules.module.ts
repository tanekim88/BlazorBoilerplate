import { CustomModule } from '#shared/src/functions/process-providers';
import { PostcssModule } from '#shared/src/modules/postcss/postcss.module';
import { BlazorAppEnvironmentModule } from './environment/environment.module';
import { BlazorPostcssModule } from './postcss/postcss.module';

import { BlazorAppUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [BlazorAppUtilitiesModule, BlazorAppEnvironmentModule, BlazorPostcssModule],
})
export class BlazorAppModulesModule {}
