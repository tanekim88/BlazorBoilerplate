import { CustomModule } from '#shared/src/functions/process-providers';
import { AuthEnvironmentModule } from './environment/environment.module';
import { AuthPostcssModule } from './postcss/postcss.module';

import { AuthUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [AuthUtilitiesModule, AuthEnvironmentModule, AuthPostcssModule],
})
export class AuthModulesModule {}
