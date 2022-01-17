import { CustomModule } from '#shared/src/functions/process-providers';
import { PostcssModule } from '#shared/src/modules/postcss/postcss.module';
import { AngularAppEnvironmentModule } from './environment/environment.module';

import { AngularAppUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [AngularAppUtilitiesModule, AngularAppEnvironmentModule, PostcssModule],
})
export class AngularAppModulesModule {}
