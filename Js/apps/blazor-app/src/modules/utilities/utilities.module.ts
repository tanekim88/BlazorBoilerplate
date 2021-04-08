import { CustomModule } from '@shared/src/functions/process-webpack-providers';
import { MergeModule as BlazorAppMergeModule } from './merge/merge.module';

import { RegexModule as BlazorAppRegexModule } from './regex/regex.module';

@CustomModule({
    imports: [BlazorAppMergeModule, BlazorAppRegexModule],
    providers: [],
})
export class BlazorAppUtilitiesModule {}
