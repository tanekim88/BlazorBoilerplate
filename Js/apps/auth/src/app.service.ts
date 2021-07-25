import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
