import { CustomInjectable } from '@shared/src/functions/process-providers';
import { EnvironmentService } from '@shared/src/modules/environment/environment/environment.service';

@CustomInjectable()
export class AuthEnvironmentService extends EnvironmentService {}
