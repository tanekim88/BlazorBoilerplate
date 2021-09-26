import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { AuthRegexService } from './regex/regex.service';

@CustomModule({
    providers: [AuthRegexService],
})
export class RegexModule {}
