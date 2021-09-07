import { blazorAppConfig } from '#solid-app/configs';
import { LOCAL_CONFIG } from '#shared/configs';
import { CustomModule } from '#shared/src/functions/process-providers';

import { BlazorAppEnvironmentService } from './environment/environment.service';

@CustomModule({
    providers: [
        {
            provide: LOCAL_CONFIG,
            useValue: blazorAppConfig,
        },
        BlazorAppEnvironmentService,
    ],
})
export class BlazorAppEnvironmentModule {}
