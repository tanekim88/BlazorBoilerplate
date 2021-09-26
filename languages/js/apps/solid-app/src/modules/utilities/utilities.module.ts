import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { MergeModule as SolidAppMergeModule } from './merge/merge.module';

import { RegexModule as SolidAppRegexModule } from './regex/regex.module';

@CustomModule({
    imports: [SolidAppMergeModule, SolidAppRegexModule],
    providers: [],
})
export class SolidAppUtilitiesModule {}
