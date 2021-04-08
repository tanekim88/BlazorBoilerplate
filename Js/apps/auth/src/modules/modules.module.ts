import { CustomModule } from '@shared/src/functions/process-webpack-providers';
import { AuthEnvironmentModule } from './environment/environment.module';

import { AuthUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [AuthUtilitiesModule, AuthEnvironmentModule],
})
export class AuthModulesModule {}
