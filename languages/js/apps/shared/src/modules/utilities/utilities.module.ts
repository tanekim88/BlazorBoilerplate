import { CustomModule } from '../../functions/process-providers';
import { MergeModule } from './modules/merge/merge.module';

import { RegexModule } from './modules/regex/regex.module';

@CustomModule({
    imports: [MergeModule, RegexModule],
    providers: [],
})
export class UtilitiesModule {}
