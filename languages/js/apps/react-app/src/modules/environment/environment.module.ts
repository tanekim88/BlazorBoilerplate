import { reactAppConfig } from '#react-app/configs';
import { LOCAL_CONFIG } from '#shared/configs';
import { CustomModule } from '#shared/src/functions/process-providers';

import { ReactAppEnvironmentService } from './environment/environment.service';

@CustomModule({
    providers: [
        {
            provide: LOCAL_CONFIG,
            useValue: reactAppConfig,
        },
        ReactAppEnvironmentService,
    ],
})
export class ReactAppEnvironmentModule {}
