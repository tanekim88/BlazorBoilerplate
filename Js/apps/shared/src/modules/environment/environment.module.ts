import { CustomModule } from '../../functions/process-webpack-providers';

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
