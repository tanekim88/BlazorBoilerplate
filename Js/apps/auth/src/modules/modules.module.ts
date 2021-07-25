import { CustomModule } from '@shared/src/functions/process-providers';
import { AuthEnvironmentModule } from './environment/environment.module';

import { AuthUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [AuthUtilitiesModule, AuthEnvironmentModule],
})
export class AuthModulesModule {}
