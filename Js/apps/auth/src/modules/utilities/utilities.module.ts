import { CustomModule } from '@shared/src/functions/process-providers';
import { MergeModule as AuthMergeModule } from './merge/merge.module';

import { RegexModule as AuthRegexModule } from './regex/regex.module';

@CustomModule({
    imports: [AuthMergeModule, AuthRegexModule],
    providers: [],
})
export class AuthUtilitiesModule {}
