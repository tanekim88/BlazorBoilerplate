import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { EnvironmentService } from '@projects/shared/src/modules/environment/environment/environment.service';

@CustomInjectable()
export class AuthEnvironmentService extends EnvironmentService {}
