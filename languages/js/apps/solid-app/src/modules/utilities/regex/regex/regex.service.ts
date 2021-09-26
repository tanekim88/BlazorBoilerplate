import { RegexService } from '@projects/shared/src/modules/utilities/modules/regex/regex/regex.service';

import { CustomInjectable } from '@projects/shared/src/functions/process-providers';

@CustomInjectable()
export class SolidAppRegexService extends RegexService {}
