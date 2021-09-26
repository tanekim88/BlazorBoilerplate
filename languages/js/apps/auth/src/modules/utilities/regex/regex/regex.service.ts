import { RegexService } from '#shared/src/modules/utilities/modules/regex/regex/regex.service';

import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class AuthRegexService extends RegexService {}
