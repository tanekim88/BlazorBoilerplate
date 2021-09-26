import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { SolidAppRegexService } from './regex/regex.service';

@CustomModule({
    providers: [SolidAppRegexService],
})
export class RegexModule {}
