import { LOCAL_CONFIG } from '@shared/configs';
import { CustomModule } from '@shared/src/functions/process-webpack-providers';
import { authConfig } from '../../../configs';
import { AuthEnvironmentService } from './environment/environment.service';

console.dir(authConfig);
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
