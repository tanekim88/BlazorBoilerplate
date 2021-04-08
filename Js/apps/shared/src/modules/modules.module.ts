import { UtilitiesModule } from './utilities/utilities.module';
import { EnvironmentModule } from './environment/environment.module';
import { CustomModule } from '../functions/process-webpack-providers';

@CustomModule({
    imports: [UtilitiesModule, EnvironmentModule],
    providers: [],
})
export class ModulesModule {}
