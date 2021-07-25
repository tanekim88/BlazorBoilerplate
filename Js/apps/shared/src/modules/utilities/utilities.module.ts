import { CustomModule } from '../../functions/process-providers';
import { MergeModule } from './merge/merge.module';

import { RegexModule } from './regex/regex.module';

@CustomModule({
    imports: [MergeModule, RegexModule],
    providers: [],
})
export class UtilitiesModule {}
