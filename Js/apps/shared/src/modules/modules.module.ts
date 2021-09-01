import { UtilitiesModule } from './utilities/utilities.module';
import { EnvironmentModule } from './environment/environment.module';
import { CustomModule } from '../functions/process-providers';
import { PostcssModule } from './postcss/postcss.module';

@CustomModule({
    imports: [UtilitiesModule, EnvironmentModule, PostcssModule,],
    providers: [],
})
export class ModulesModule {}
