import { solidAppConfig } from '@projects/solid-app/configs';
import { LOCAL_CONFIG } from '@projects/shared/configs';
import { CustomModule } from '@projects/shared/src/functions/process-providers';

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
