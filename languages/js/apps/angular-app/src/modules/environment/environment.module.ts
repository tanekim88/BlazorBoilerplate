import { angularAppConfig } from '#angular-app/configs';
import { LOCAL_CONFIG } from '#shared/configs';
import { CustomModule } from '#shared/src/functions/process-providers';

import { AngularAppEnvironmentService } from './environment/environment.service';

@CustomModule({
    providers: [
        {
            provide: LOCAL_CONFIG,
            useValue: angularAppConfig,
        },
        AngularAppEnvironmentService,
    ],
})
export class AngularAppEnvironmentModule {}
