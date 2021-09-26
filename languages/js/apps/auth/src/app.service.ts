import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

@CustomInjectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
