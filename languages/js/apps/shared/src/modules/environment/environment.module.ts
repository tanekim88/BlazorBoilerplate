import { LOCAL_CONFIG, sharedConfig } from '#shared/configs';
import { CustomModule } from '../../functions/process-providers';

import { EnvironmentService } from './environment/environment.service';

@CustomModule({
    providers: [
        // {
        //   provide: LOCAL_CONFIG,
        //   useValue: sharedConfig,
        // },
        EnvironmentService,
    ],
    imports: [],
})
export class EnvironmentModule {}
