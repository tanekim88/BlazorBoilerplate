import { CustomModule } from '#shared/src/functions/process-providers';
import { PostcssModule } from '#shared/src/modules/postcss/postcss.module';
import { ReactAppEnvironmentModule } from './environment/environment.module';

import { ReactAppUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [ReactAppUtilitiesModule, ReactAppEnvironmentModule, PostcssModule],
})
export class ReactAppModulesModule {}
