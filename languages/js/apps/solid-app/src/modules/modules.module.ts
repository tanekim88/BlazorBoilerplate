import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { PostcssModule } from '@projects/shared/src/modules/postcss/postcss.module';
import { SolidAppEnvironmentModule } from './environment/environment.module';

import { SolidAppUtilitiesModule } from './utilities/utilities.module';

@CustomModule({
    providers: [],
    imports: [SolidAppUtilitiesModule, SolidAppEnvironmentModule, PostcssModule],
})
export class SolidAppModulesModule {}
