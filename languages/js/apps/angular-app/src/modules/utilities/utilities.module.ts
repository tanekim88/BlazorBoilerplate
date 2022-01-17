import { CustomModule } from '#shared/src/functions/process-providers';
import { MergeModule as AngularAppMergeModule } from './merge/merge.module';

import { RegexModule as AngularAppRegexModule } from './regex/regex.module';

@CustomModule({
    imports: [AngularAppMergeModule, AngularAppRegexModule],
    providers: [],
})
export class AngularAppUtilitiesModule {}
