import { RegexService } from '@shared/src/modules/utilities/regex/regex/regex.service';

import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class AuthRegexService extends RegexService {}
