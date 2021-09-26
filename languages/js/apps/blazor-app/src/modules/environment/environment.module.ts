import { blazorAppConfig, BlazorAppConfig } from '@projects/blazor-app/configs';
import { LOCAL_CONFIG } from '@projects/shared/configs';
import { CustomModule } from '@projects/shared/src/functions/process-providers';

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
