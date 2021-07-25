import { LOCAL_CONFIG } from '@shared/configs';
import { CustomModule } from '@shared/src/functions/process-providers';
import { blazorAppConfig } from '../../../configs';
import { BlazorAppEnvironmentService } from './environment/environment.service';

console.dir(blazorAppConfig);
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
