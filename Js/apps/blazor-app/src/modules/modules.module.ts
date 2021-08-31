import { CustomModule } from '#shared/src/functions/process-providers';
import { BlazorAppEnvironmentModule } from './environment/environment.module';

import { BlazorAppUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [BlazorAppUtilitiesModule, BlazorAppEnvironmentModule],
})
export class BlazorAppModulesModule {}
