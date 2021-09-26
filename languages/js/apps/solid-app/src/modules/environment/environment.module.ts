import { solidAppConfig } from '#solid-app/configs';
import { LOCAL_CONFIG } from '#shared/configs';
import { CustomModule } from '#shared/src/functions/process-providers';

import { SolidAppEnvironmentService } from './environment/environment.service';

@CustomModule({
    providers: [
        {
            provide: LOCAL_CONFIG,
            useValue: solidAppConfig,
        },
        SolidAppEnvironmentService,
    ],
})
export class SolidAppEnvironmentModule {}
