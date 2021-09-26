import { CustomModule } from '../../../../functions/process-providers';
import { RegexService } from './regex/regex.service';

@CustomModule({
    providers: [RegexService],
})
export class RegexModule {}
