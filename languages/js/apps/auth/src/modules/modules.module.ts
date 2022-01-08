import { CustomModule } from '#shared/src/functions/process-providers';
import { PostcssModule } from '#shared/src/modules/postcss/postcss.module';
import { AuthEnvironmentModule } from './environment/environment.module';

import { AuthUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [AuthUtilitiesModule, AuthEnvironmentModule, PostcssModule],
})
export class AuthModulesModule {}
