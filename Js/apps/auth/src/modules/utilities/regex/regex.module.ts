import { CustomModule } from '@shared/src/functions/process-webpack-providers';
import { AuthRegexService } from './regex/regex.service';

@CustomModule({
    providers: [AuthRegexService],
})
export class RegexModule {}
