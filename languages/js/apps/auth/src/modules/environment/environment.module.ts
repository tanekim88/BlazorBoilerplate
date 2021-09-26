import { LOCAL_CONFIG } from '@projects/shared/configs';
import { CustomModule } from '@projects/shared/src/functions/process-providers';
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
