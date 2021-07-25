import { RegexService } from '@shared/src/modules/utilities/regex/regex/regex.service';

import { CustomInjectable } from '@shared/src/functions/process-providers';

@CustomInjectable()
export class BlazorAppRegexService extends RegexService {}
