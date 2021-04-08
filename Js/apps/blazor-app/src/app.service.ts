import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
