import { authConfig } from '#auth/configs';
import { LOCAL_CONFIG } from '#shared/configs';
import { CustomModule } from '#shared/src/functions/process-providers';

import { AuthEnvironmentService } from './environment/environment.service';

@CustomModule({
    providers: [
        {
            provide: LOCAL_CONFIG,
            useValue: authConfig,
        },
        AuthEnvironmentService,
    ],
})
export class AuthEnvironmentModule {}
