import { CustomModule } from '#shared/src/functions/process-providers';
import { MergeModule as ReactAppMergeModule } from './merge/merge.module';

import { RegexModule as ReactAppRegexModule } from './regex/regex.module';

@CustomModule({
    imports: [ReactAppMergeModule, ReactAppRegexModule],
    providers: [],
})
export class ReactAppUtilitiesModule {}
