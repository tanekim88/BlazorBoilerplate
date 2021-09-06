import { BlazorAppConfig } from '#blazor-app/configs';
import { LOCAL_CONFIG } from '#shared/configs';
import { CustomModule } from '#shared/src/functions/process-providers';

import { BlazorAppEnvironmentService } from './environment/environment.service';

@CustomModule({
    providers: [
        {
            provide: LOCAL_CONFIG,
            useValue: BlazorAppConfig,
        },
        BlazorAppEnvironmentService,
    ],
})
export class BlazorAppEnvironmentModule {}
